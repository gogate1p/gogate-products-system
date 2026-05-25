import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { GogateCourierAdapter, quoteAllCouriers } from '@gogate/integrations';
import { SHIPMENT_TRACKING_STEPS } from '@gogate/shared';

@Injectable()
export class ShipmentsService {
  private gogate = new GogateCourierAdapter();

  constructor(private prisma: PrismaService) {}

  async quoteDelivery(pickupPincode: string, deliveryPincode: string, weightGrams: number) {
    return quoteAllCouriers([this.gogate], { pickupPincode, deliveryPincode, weightGrams });
  }

  async bookForOrder(orderId: string, provider: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId }, include: { items: true } });
    if (!order) throw new Error('Order not found');
    const weight = order.items.reduce((s, i) => s + i.quantity * 500, 0);
    const booked = await this.gogate.bookShipment({
      orderId,
      pickupPincode: '000000',
      deliveryPincode: order.deliveryPincode,
      weightGrams: weight,
      cod: !!order.codAmount,
      codAmount: order.codAmount ? Number(order.codAmount) : undefined,
    });
    const shipment = await this.prisma.shipment.create({
      data: {
        shipmentNumber: `SHP${Date.now()}`,
        orderId,
        courier: provider as never,
        externalAwbn: booked.awbn,
        labelUrl: booked.labelUrl,
        manifestUrl: booked.manifestUrl,
        status: 'PICKUP_SCHEDULED',
        pickupDate: booked.pickupScheduledAt ? new Date(booked.pickupScheduledAt) : new Date(),
        trackingEvents: {
          create: { status: 'BOOKED', description: 'Shipment booked', source: provider as never },
        },
      },
    });
    await this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'PICKUP_SCHEDULED',
        subStatus: 'Item waiting to be picked up by courier partner',
      },
    });
    return shipment;
  }

  tracking(shipmentNumber: string) {
    return this.prisma.shipment.findUnique({
      where: { shipmentNumber },
      include: { trackingEvents: { orderBy: { createdAt: 'asc' } }, legs: true },
    }).then((s) => {
      if (!s) return null;
      const idx = SHIPMENT_TRACKING_STEPS.indexOf(
        s.status === 'PICKED_UP' || s.status === 'AT_SELLER_HUB' || s.status === 'AT_HUB'
          ? 'IN_TRANSIT'
          : (s.status === 'BOOKED' || s.status === 'PICKUP_SCHEDULED' ? 'BOOKED' : s.status === 'OUT_FOR_DELIVERY' ? 'OUT_FOR_DELIVERY' : s.status === 'DELIVERED' ? 'DELIVERED' : 'IN_TRANSIT'),
      );
      return {
        shipmentNumber: s.shipmentNumber,
        status: s.status,
        steps: SHIPMENT_TRACKING_STEPS.map((label, i) => ({
          label: label.replace(/_/g, ' '),
          completed: i <= idx,
        })),
        events: s.trackingEvents,
        legs: s.legs,
      };
    });
  }

  /** COD QR paid — updates shipment; order stays OUT_FOR_DELIVERY until hub report */
  markCodPaid(shipmentId: string) {
    return this.prisma.shipment.update({
      where: { id: shipmentId },
      data: { codCollected: true, codQrPaidAt: new Date() },
    });
  }

  /** Final delivery only after agent submits hub report */
  confirmDelivery(shipmentId: string) {
    return this.prisma.$transaction(async (tx) => {
      const shipment = await tx.shipment.update({
        where: { id: shipmentId },
        data: { status: 'DELIVERED', deliveryDate: new Date() },
      });
      if (shipment.orderId) {
        await tx.order.update({
          where: { id: shipment.orderId },
          data: { status: 'DELIVERED', subStatus: 'Delivered' },
        });
        await tx.orderStatusHistory.create({
          data: { orderId: shipment.orderId, status: 'DELIVERED', message: 'Delivered after hub confirmation' },
        });
      }
      return shipment;
    });
  }
}
