import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';

@Controller('shipments')
export class ShipmentsController {
  constructor(private shipments: ShipmentsService) {}

  @Post('quote')
  quote(@Body() body: { pickupPincode: string; deliveryPincode: string; weightGrams: number }) {
    return this.shipments.quoteDelivery(body.pickupPincode, body.deliveryPincode, body.weightGrams);
  }

  @Post('book')
  book(@Body() body: { orderId: string; provider?: string }) {
    return this.shipments.bookForOrder(body.orderId, body.provider || 'GOGATE');
  }

  @Get('track/:shipmentNumber')
  track(@Param('shipmentNumber') shipmentNumber: string) {
    return this.shipments.tracking(shipmentNumber);
  }

  @Post(':id/cod-paid')
  codPaid(@Param('id') id: string) {
    return this.shipments.markCodPaid(id);
  }

  @Post(':id/confirm-delivery')
  confirm(@Param('id') id: string) {
    return this.shipments.confirmDelivery(id);
  }
}
