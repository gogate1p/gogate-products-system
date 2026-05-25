import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { GogateCourierAdapter, quoteAllCouriers } from '@gogate/integrations';

@Injectable()
export class PincodeService {
  private gogate = new GogateCourierAdapter();

  constructor(private prisma: PrismaService) {}

  async checkDelivery(deliveryPincode: string, pickupPincode: string, weightGrams = 500) {
    const dbRows = await this.prisma.pincodeServiceability.findMany({
      where: { pincode: deliveryPincode, available: true },
    });
    const quotes = await quoteAllCouriers([this.gogate], {
      pickupPincode,
      deliveryPincode,
      weightGrams,
    });
    const storePickup = await this.prisma.hub.findFirst({
      where: { pincode: deliveryPincode, status: 'ACTIVE' },
    });
    const hyperlocal = await this.prisma.sellerProfile.findFirst({
      where: { pincode: deliveryPincode, kycStatus: 'VERIFIED', user: { status: 'ACTIVE' } },
    });
    return {
      pincode: deliveryPincode,
      providers: quotes,
      dbServiceability: dbRows,
      storePickupAvailable: !!storePickup,
      hyperlocalAvailable: !!hyperlocal,
      estimatedDelivery: quotes[0]?.estimatedDelivery,
    };
  }

  upsertServiceability(pincode: string, provider: string, available: boolean, etaDays?: number) {
    return this.prisma.pincodeServiceability.upsert({
      where: { pincode_provider: { pincode, provider: provider as never } },
      create: { pincode, provider: provider as never, available, etaDays },
      update: { available, etaDays },
    });
  }
}
