import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PincodeService } from './pincode.service';

@Controller('pincode')
export class PincodeController {
  constructor(private pincode: PincodeService) {}

  @Get('check')
  check(
    @Query('delivery') delivery: string,
    @Query('pickup') pickup: string,
    @Query('weight') weight?: string,
  ) {
    return this.pincode.checkDelivery(delivery, pickup || '411001', Number(weight) || 500);
  }

  @Post('serviceability')
  upsert(@Body() body: { pincode: string; provider: string; available: boolean; etaDays?: number }) {
    return this.pincode.upsertServiceability(body.pincode, body.provider, body.available, body.etaDays);
  }
}
