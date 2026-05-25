import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { UserRole } from '@gogate/database';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async createSeller(data: {
    email: string;
    password: string;
    businessName: string;
    ownerName: string;
    address: string;
    pincode: string;
    phone?: string;
  }) {
    const passwordHash = await (await import('bcrypt')).hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        phone: data.phone,
        passwordHash,
        role: 'SELLER',
        status: 'PENDING',
      },
    });
    const seller = await this.prisma.sellerProfile.create({
      data: {
        userId: user.id,
        sellerId: `GP-SELLER-${String(Date.now()).slice(-6)}`,
        businessName: data.businessName,
        ownerName: data.ownerName,
        address: data.address,
        pincode: data.pincode,
        kycStatus: 'NOT_STARTED',
      },
    });
    return { user, seller };
  }

  verifySeller(sellerId: string, adminId: string) {
    return this.prisma.sellerProfile.update({
      where: { id: sellerId },
      data: { kycStatus: 'VERIFIED', verifiedAt: new Date(), verifiedBy: adminId },
      include: { user: true },
    });
  }

  setSellerCkyc(sellerId: string, diditCkycId: string) {
    return this.prisma.sellerProfile.update({
      where: { id: sellerId },
      data: { diditCkycId, kycStatus: 'DIDIT_PENDING' },
    });
  }

  listSellers() {
    return this.prisma.sellerProfile.findMany({
      include: { user: { select: { email: true, phone: true, status: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createCustomer(data: { email: string; password: string; fullName: string; phone?: string }) {
    const passwordHash = await (await import('bcrypt')).hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        phone: data.phone,
        passwordHash,
        role: 'CUSTOMER',
        status: 'ACTIVE',
      },
    });
    const customer = await this.prisma.customerProfile.create({
      data: { userId: user.id, fullName: data.fullName },
    });
    await this.prisma.wallet.create({ data: { userId: user.id } });
    return { user, customer };
  }

  listCustomers() {
    return this.prisma.customerProfile.findMany({
      include: { user: { select: { id: true, email: true, phone: true, status: true } } },
    });
  }

  setUserStatus(userId: string, status: 'ACTIVE' | 'DISABLED' | 'SUSPENDED') {
    return this.prisma.user.update({ where: { id: userId }, data: { status } });
  }

  listOrders() {
    return this.prisma.order.findMany({
      include: {
        customer: true,
        seller: true,
        items: { include: { product: true } },
        payment: true,
      },
      orderBy: { placedAt: 'desc' },
      take: 200,
    });
  }

  listPayments() {
    return this.prisma.payment.findMany({
      include: { order: { select: { orderNumber: true } } },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
  }

  createPayment(data: {
    orderId: string;
    provider: string;
    amount: number;
    status: string;
    externalId?: string;
  }) {
    return this.prisma.payment.create({
      data: {
        orderId: data.orderId,
        provider: data.provider as never,
        amount: data.amount,
        status: data.status,
        externalId: data.externalId,
      },
    });
  }

  listApiCredentials() {
    return this.prisma.apiCredential.findMany({
      select: { id: true, key: true, encrypted: true, updatedAt: true },
    });
  }

  upsertApiCredential(key: string, value: string) {
    return this.prisma.apiCredential.upsert({
      where: { key },
      create: { key, value },
      update: { value, updatedAt: new Date() },
    });
  }

  dashboardStats() {
    return Promise.all([
      this.prisma.user.count({ where: { role: 'SELLER' } }),
      this.prisma.user.count({ where: { role: 'CUSTOMER' } }),
      this.prisma.order.count(),
      this.prisma.product.count({ where: { approvalStatus: 'PENDING_APPROVAL' } }),
      this.prisma.shipment.count(),
      this.prisma.supportTicket.count({ where: { status: 'OPEN' } }),
    ]).then(([sellers, customers, orders, pendingProducts, shipments, openTickets]) => ({
      sellers,
      customers,
      orders,
      pendingProducts,
      shipments,
      openTickets,
    }));
  }
}
