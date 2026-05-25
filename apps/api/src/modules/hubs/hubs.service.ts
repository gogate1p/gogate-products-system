import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { generateHubId } from '@gogate/shared';

@Injectable()
export class HubsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    name: string;
    address: string;
    pincode: string;
    radiusKm: number;
    email: string;
    phone: string;
    managerName?: string;
  }) {
    const count = await this.prisma.hub.count();
    return this.prisma.hub.create({
      data: {
        hubId: generateHubId(count + 1),
        name: data.name,
        address: data.address,
        pincode: data.pincode,
        radiusKm: data.radiusKm,
        email: data.email,
        phone: data.phone,
        status: 'PENDING',
        kycStatus: 'NOT_STARTED',
      },
    });
  }

  list() {
    return this.prisma.hub.findMany({
      include: { agents: true, _count: { select: { shipments: true } } },
    });
  }

  activate(hubId: string) {
    return this.prisma.hub.update({
      where: { id: hubId },
      data: { status: 'ACTIVE', activatedAt: new Date(), kycStatus: 'VERIFIED' },
    });
  }
}
