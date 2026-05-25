import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class CouponsService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.coupon.findMany({ orderBy: { validTo: 'desc' } });
  }

  create(data: {
    code: string;
    discountType: string;
    discountValue: number;
    minOrder?: number;
    maxUses?: number;
    validFrom: string;
    validTo: string;
  }) {
    return this.prisma.coupon.create({
      data: {
        code: data.code.toUpperCase(),
        discountType: data.discountType,
        discountValue: data.discountValue,
        minOrder: data.minOrder,
        maxUses: data.maxUses,
        validFrom: new Date(data.validFrom),
        validTo: new Date(data.validTo),
      },
    });
  }

  async validate(code: string, orderTotal: number) {
    const coupon = await this.prisma.coupon.findUnique({ where: { code: code.toUpperCase() } });
    if (!coupon || !coupon.active) return { valid: false, reason: 'Invalid coupon' };
    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validTo) return { valid: false, reason: 'Expired' };
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) return { valid: false, reason: 'Limit reached' };
    if (coupon.minOrder && orderTotal < Number(coupon.minOrder)) {
      return { valid: false, reason: `Minimum order ₹${coupon.minOrder}` };
    }
    const discount =
      coupon.discountType === 'PERCENT'
        ? (orderTotal * Number(coupon.discountValue)) / 100
        : Number(coupon.discountValue);
    return { valid: true, discount, couponId: coupon.id };
  }
}
