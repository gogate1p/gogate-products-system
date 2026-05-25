import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class SupportService {
  constructor(private prisma: PrismaService) {}

  createTicket(customerUserId: string, subject: string, body: string) {
    return this.prisma.supportTicket.create({
      data: { customerId: customerUserId, subject, body },
    });
  }

  listForCustomer(customerUserId: string) {
    return this.prisma.supportTicket.findMany({
      where: { customerId: customerUserId },
      orderBy: { createdAt: 'desc' },
    });
  }

  listOpen() {
    return this.prisma.supportTicket.findMany({
      where: { status: 'OPEN' },
      include: {
        customer: {
          select: { email: true, customerProfile: { select: { fullName: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  assignAgent(ticketId: string, agentId: string) {
    return this.prisma.supportTicket.update({
      where: { id: ticketId },
      data: { agentId, status: 'IN_PROGRESS' },
    });
  }

  closeTicket(ticketId: string) {
    return this.prisma.supportTicket.update({
      where: { id: ticketId },
      data: { status: 'CLOSED' },
    });
  }

  getCustomerContext(customerUserId: string) {
    return this.prisma.user.findUnique({
      where: { id: customerUserId },
      include: {
        customerProfile: {
          include: {
            orders: {
              include: { items: { include: { product: true } }, payment: true },
              orderBy: { placedAt: 'desc' },
              take: 50,
            },
          },
        },
        addresses: true,
        wallet: { include: { ledger: { take: 20, orderBy: { createdAt: 'desc' } } } },
      },
    });
  }

  chatAppend(sessionId: string, message: { role: string; text: string }) {
    return this.prisma.chatSession.update({
      where: { id: sessionId },
      data: { messages: { push: message } as never },
    });
  }

  startChat(userId: string) {
    return this.prisma.chatSession.create({
      data: { userId, messages: [{ role: 'bot', text: 'Hello! How can Gogate Products help you today?' }] },
    });
  }
}
