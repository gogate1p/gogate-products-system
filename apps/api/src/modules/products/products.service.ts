import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  listApproved() {
    return this.prisma.product.findMany({
      where: { approvalStatus: 'APPROVED' },
      include: { images: true, seller: true, reviews: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  getById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        seller: true,
        reviews: { include: { user: { select: { email: true } } } },
      },
    });
  }

  createForSeller(sellerId: string, data: Record<string, unknown>) {
    return this.prisma.product.create({
      data: {
        sellerId,
        title: String(data.title),
        description: String(data.description),
        price: data.price as number,
        weightGrams: Number(data.weightGrams),
        lengthCm: Number(data.lengthCm),
        breadthCm: Number(data.breadthCm),
        heightCm: Number(data.heightCm),
        returnable: Boolean(data.returnable),
        cancellable: Boolean(data.cancellable ?? true),
        replaceable: Boolean(data.replaceable),
        approvalStatus: 'PENDING_APPROVAL',
        manufacturer: data.manufacturer as string | undefined,
        packerDetails: data.packerDetails as string | undefined,
        manufacturerAddress: data.manufacturerAddress as string | undefined,
        manufacturerPincode: data.manufacturerPincode as string | undefined,
      },
    });
  }

  approve(productId: string, adminId: string) {
    return this.prisma.product.update({
      where: { id: productId },
      data: { approvalStatus: 'APPROVED', approvedAt: new Date(), approvedBy: adminId },
    });
  }
}
