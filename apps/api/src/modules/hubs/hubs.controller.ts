import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HubsService } from './hubs.service';

@Controller('hubs')
export class HubsController {
  constructor(private hubs: HubsService) {}

  @Get()
  list() {
    return this.hubs.list();
  }

  @Post()
  create(@Body() body: Record<string, unknown>) {
    return this.hubs.create(body as never);
  }

  @Post(':id/activate')
  activate(@Param('id') id: string) {
    return this.hubs.activate(id);
  }
}
