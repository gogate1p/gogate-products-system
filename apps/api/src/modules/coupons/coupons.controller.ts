import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CouponsService } from './coupons.service';

@Controller('coupons')
export class CouponsController {
  constructor(private coupons: CouponsService) {}

  @Get()
  list() {
    return this.coupons.list();
  }

  @Post()
  create(@Body() body: Record<string, unknown>) {
    return this.coupons.create(body as never);
  }

  @Get('validate')
  validate(@Query('code') code: string, @Query('total') total: string) {
    return this.coupons.validate(code, Number(total) || 0);
  }
}
