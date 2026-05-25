import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class AgentsService {
  constructor(private prisma: PrismaService) {}

  listPending() {
    return this.prisma.deliveryAgent.findMany({
      where: { status: 'PENDING' },
      include: { user: { select: { email: true, phone: true } }, hub: true },
    });
  }

  approve(agentId: string, hubId: string) {
    return this.prisma.$transaction(async (tx) => {
      const agent = await tx.deliveryAgent.update({
        where: { id: agentId },
        data: { hubId, status: 'ACTIVE', kycStatus: 'VERIFIED' },
      });
      await tx.user.update({
        where: { id: agent.userId },
        data: { status: 'ACTIVE' },
      });
      return agent;
    });
  }

  setWorkingSlots(agentId: string, slots: unknown) {
    return this.prisma.deliveryAgent.update({
      where: { id: agentId },
      data: { workingSlots: slots as never },
    });
  }

  hubCheckIn(agentId: string, hubId: string) {
    return this.prisma.hubCheckIn.create({ data: { agentId, hubId } });
  }

  register(data: { email: string; password: string; phone?: string }) {
    return import('bcrypt').then(async (bcrypt) => {
      const passwordHash = await bcrypt.hash(data.password, 10);
      const user = await this.prisma.user.create({
        data: {
          email: data.email,
          phone: data.phone,
          passwordHash,
          role: 'DELIVERY_AGENT',
          status: 'PENDING',
        },
      });
      const agent = await this.prisma.deliveryAgent.create({
        data: {
          userId: user.id,
          agentId: `GP-AGENT-${String(Date.now()).slice(-6)}`,
        },
      });
      return { user, agent };
    });
  }
}
