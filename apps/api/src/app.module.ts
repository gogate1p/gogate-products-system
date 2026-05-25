import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { SellersModule } from './modules/sellers/sellers.module';
import { ShipmentsModule } from './modules/shipments/shipments.module';
import { HubsModule } from './modules/hubs/hubs.module';
import { AdminModule } from './modules/admin/admin.module';
import { CmsModule } from './modules/cms/cms.module';
import { SupportModule } from './modules/support/support.module';
import { CouponsModule } from './modules/coupons/coupons.module';
import { PincodeModule } from './modules/pincode/pincode.module';
import { AgentsModule } from './modules/agents/agents.module';
import { HealthController } from './common/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    OrdersModule,
    ProductsModule,
    SellersModule,
    ShipmentsModule,
    HubsModule,
    AdminModule,
    CmsModule,
    SupportModule,
    CouponsModule,
    PincodeModule,
    AgentsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
