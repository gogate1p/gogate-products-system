import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { generateOrderNumber, buildCustomerOrderTracking } from '@gogate/shared';
import { OrderStatus } from '@gogate/database';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async listForCustomer(customerUserId: string) {
    const customer = await this.prisma.customerProfile.findFirst({
      where: { userId: customerUserId },
    });
    if (!customer) return [];
    return this.prisma.order.findMany({
      where: { customerId: customer.id },
      include: {
        items: { include: { product: { include: { images: true } } } },
        seller: true,
        statusHistory: { orderBy: { createdAt: 'asc' } },
      },
      orderBy: { placedAt: 'desc' },
    });
  }

  async getTracking(orderNumber: string) {
    const order = await this.prisma.order.findUnique({
      where: { orderNumber },
      include: { statusHistory: { orderBy: { createdAt: 'asc' } }, shipment: { include: { trackingEvents: true } } },
    });
    if (!order) throw new NotFoundException('Order not found');
    const steps = buildCustomerOrderTracking(
      order.status as OrderStatus,
      order.statusHistory.map((h) => ({
        status: h.status as OrderStatus,
        createdAt: h.createdAt,
        message: h.message ?? undefined,
      })),
    );
    return { orderNumber: order.orderNumber, status: order.status, subStatus: order.subStatus, steps, shipment: order.shipment };
  }

  async sellerAccept(orderId: string, slaHours: number, processingEta: Date) {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'SELLER_ACCEPTED',
          subStatus: 'Seller is processing your order',
          slaHours,
          processingEta,
        },
      });
      await tx.orderStatusHistory.create({
        data: { orderId, status: 'SELLER_ACCEPTED', message: order.subStatus ?? undefined },
      });
      return order;
    });
  }

  async sellerReject(orderId: string, reason: string) {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.update({
        where: { id: orderId },
        data: { status: 'CANCELLED', subStatus: reason },
      });
      await tx.orderStatusHistory.create({
        data: { orderId, status: 'CANCELLED', message: reason },
      });
      return order;
    });
  }

  listByBucket(sellerId: string, bucket: string) {
    const statusMap: Record<string, OrderStatus[]> = {
      NEW: ['SELLER_PENDING'],
      PROCESSING: ['SELLER_ACCEPTED', 'SELLER_PROCESSING'],
      PENDING_PICKUP: ['COURIER_BOOKING', 'PICKUP_SCHEDULED'],
      PICKED_UP: ['PICKED_UP'],
      SHIPPED: ['SHIPPED'],
      IN_TRANSIT: ['IN_TRANSIT'],
      OUT_FOR_DELIVERY: ['OUT_FOR_DELIVERY'],
      DELIVERED: ['DELIVERED'],
      RETURN: ['RETURN_REQUESTED', 'RETURNED'],
      REPLACEMENT: ['REPLACEMENT'],
      CANCELLED: ['CANCELLED'],
    };
    const statuses = statusMap[bucket] || [];
    return this.prisma.order.findMany({
      where: { sellerId, status: { in: statuses } },
      include: { items: { include: { product: { include: { images: true } } } }, customer: true },
      orderBy: { placedAt: 'desc' },
    });
  }

  async createPlaceholder(customerId: string, sellerId: string, deliveryPincode: string, totalAmount: number) {
    const orderNumber = generateOrderNumber();
    return this.prisma.order.create({
      data: {
        orderNumber,
        customerId,
        sellerId,
        deliveryPincode,
        totalAmount,
        status: 'PLACED',
        statusHistory: { create: { status: 'PLACED', message: 'Order placed' } },
      },
    });
  }
}
