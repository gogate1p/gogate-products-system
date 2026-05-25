import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private admin: AdminService) {}

  @Get('stats')
  stats() {
    return this.admin.dashboardStats();
  }

  @Get('sellers')
  listSellers() {
    return this.admin.listSellers();
  }

  @Post('sellers')
  createSeller(@Body() body: Record<string, string>) {
    return this.admin.createSeller(body as never);
  }

  @Patch('sellers/:id/verify')
  verifySeller(@Param('id') id: string, @Body('adminId') adminId: string) {
    return this.admin.verifySeller(id, adminId || 'admin');
  }

  @Patch('sellers/:id/ckyc')
  setCkyc(@Param('id') id: string, @Body('diditCkycId') diditCkycId: string) {
    return this.admin.setSellerCkyc(id, diditCkycId);
  }

  @Get('customers')
  listCustomers() {
    return this.admin.listCustomers();
  }

  @Post('customers')
  createCustomer(@Body() body: Record<string, string>) {
    return this.admin.createCustomer(body as never);
  }

  @Patch('users/:id/status')
  setStatus(@Param('id') id: string, @Body('status') status: 'ACTIVE' | 'DISABLED' | 'SUSPENDED') {
    return this.admin.setUserStatus(id, status);
  }

  @Get('orders')
  listOrders() {
    return this.admin.listOrders();
  }

  @Get('payments')
  listPayments() {
    return this.admin.listPayments();
  }

  @Post('payments')
  createPayment(@Body() body: Record<string, unknown>) {
    return this.admin.createPayment(body as never);
  }

  @Get('api-keys')
  listKeys() {
    return this.admin.listApiCredentials();
  }

  @Post('api-keys')
  saveKey(@Body() body: { key: string; value: string }) {
    return this.admin.upsertApiCredential(body.key, body.value);
  }
}
