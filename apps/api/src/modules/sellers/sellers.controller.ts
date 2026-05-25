import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { SellersService } from './sellers.service';

@Controller('sellers')
export class SellersController {
  constructor(private sellers: SellersService) {}

  @Get('profile/:userId')
  profile(@Param('userId') userId: string) {
    return this.sellers.getProfile(userId);
  }

  @Patch(':id/kyc')
  kyc(@Param('id') id: string, @Body() body: { step: string; data?: Record<string, string> }) {
    return this.sellers.updateKycStep(id, body.step as never, body.data);
  }

  @Post(':id/verify')
  verify(@Param('id') id: string, @Body() body: { adminId: string }) {
    return this.sellers.verifySeller(id, body.adminId);
  }

  @Get(':id/orders/:bucket')
  orders(@Param('id') id: string, @Param('bucket') bucket: string) {
    return this.sellers.ordersByBucket(id, bucket);
  }
}
