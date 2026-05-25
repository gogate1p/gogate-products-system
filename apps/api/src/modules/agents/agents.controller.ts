import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AgentsService } from './agents.service';

@Controller('agents')
export class AgentsController {
  constructor(private agents: AgentsService) {}

  @Get('pending')
  pending() {
    return this.agents.listPending();
  }

  @Post('register')
  register(@Body() body: { email: string; password: string; phone?: string }) {
    return this.agents.register(body);
  }

  @Patch(':id/approve')
  approve(@Param('id') id: string, @Body('hubId') hubId: string) {
    return this.agents.approve(id, hubId);
  }

  @Patch(':id/slots')
  slots(@Param('id') id: string, @Body('slots') slots: unknown) {
    return this.agents.setWorkingSlots(id, slots);
  }

  @Post(':id/check-in')
  checkIn(@Param('id') id: string, @Body('hubId') hubId: string) {
    return this.agents.hubCheckIn(id, hubId);
  }
}
