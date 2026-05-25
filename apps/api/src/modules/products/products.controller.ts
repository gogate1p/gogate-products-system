import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private products: ProductsService) {}

  @Get()
  list() {
    return this.products.listApproved();
  }

  @Get(':id')
  one(@Param('id') id: string) {
    return this.products.getById(id);
  }

  @Post('seller/:sellerId')
  create(@Param('sellerId') sellerId: string, @Body() body: Record<string, unknown>) {
    return this.products.createForSeller(sellerId, body);
  }

  @Post(':id/approve')
  approve(@Param('id') id: string, @Body() body: { adminId: string }) {
    return this.products.approve(id, body.adminId);
  }
}
