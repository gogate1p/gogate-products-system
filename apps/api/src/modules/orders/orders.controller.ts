import { Controller, Get, Param, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orders: OrdersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('my')
  myOrders(@Req() req: { user: { sub: string } }) {
    return this.orders.listForCustomer(req.user.sub);
  }

  @Get('seller/:sellerId/bucket/:bucket')
  sellerBucket(@Param('sellerId') sellerId: string, @Param('bucket') bucket: string) {
    return this.orders.listByBucket(sellerId, bucket);
  }

  @Get(':orderNumber/tracking')
  tracking(@Param('orderNumber') orderNumber: string) {
    return this.orders.getTracking(orderNumber);
  }

  @Post(':id/seller/accept')
  sellerAccept(
    @Param('id') id: string,
    @Body() body: { slaHours: number; processingEta: string },
  ) {
    return this.orders.sellerAccept(id, body.slaHours, new Date(body.processingEta));
  }

  @Post(':id/seller/reject')
  sellerReject(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.orders.sellerReject(id, body.reason);
  }

}
