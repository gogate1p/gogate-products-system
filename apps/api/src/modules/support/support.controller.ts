import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SupportService } from './support.service';

@Controller('support')
export class SupportController {
  constructor(private support: SupportService) {}

  @Post('tickets')
  create(@Body() body: { customerId: string; subject: string; body: string }) {
    return this.support.createTicket(body.customerId, body.subject, body.body);
  }

  @Get('tickets/customer/:userId')
  customerTickets(@Param('userId') userId: string) {
    return this.support.listForCustomer(userId);
  }

  @Get('tickets/open')
  openTickets() {
    return this.support.listOpen();
  }

  @Get('customer/:userId')
  customerContext(@Param('userId') userId: string) {
    return this.support.getCustomerContext(userId);
  }

  @Patch('tickets/:id/assign')
  assign(@Param('id') id: string, @Body('agentId') agentId: string) {
    return this.support.assignAgent(id, agentId);
  }

  @Patch('tickets/:id/close')
  close(@Param('id') id: string) {
    return this.support.closeTicket(id);
  }

  @Post('chat')
  startChat(@Body('userId') userId: string) {
    return this.support.startChat(userId);
  }
}
