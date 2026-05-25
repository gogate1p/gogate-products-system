import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { KycStatus } from '@gogate/database';

@Injectable()
export class SellersService {
  constructor(private prisma: PrismaService) {}

  getProfile(userId: string) {
    return this.prisma.sellerProfile.findFirst({
      where: { userId },
      include: { user: true, documents: true },
    });
  }

  updateKycStep(sellerId: string, step: KycStatus, data?: Record<string, string>) {
    return this.prisma.sellerProfile.update({
      where: { id: sellerId },
      data: {
        kycStatus: step,
        ...(data?.bankAccountNo && { bankAccountNo: data.bankAccountNo }),
        ...(data?.bankIfsc && { bankIfsc: data.bankIfsc }),
        ...(data?.bankHolderName && { bankHolderName: data.bankHolderName }),
        ...(data?.diditCkycId && { diditCkycId: data.diditCkycId }),
      },
    });
  }

  verifySeller(sellerId: string, adminId: string) {
    return this.prisma.sellerProfile.update({
      where: { id: sellerId },
      data: { kycStatus: 'VERIFIED', verifiedAt: new Date(), verifiedBy: adminId },
    });
  }

  ordersByBucket(sellerId: string, bucket: string) {
    const statusMap: Record<string, string[]> = {
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
      where: { sellerId, status: { in: statuses as never[] } },
      include: { items: { include: { product: { include: { images: true } } } } },
    });
  }
}
