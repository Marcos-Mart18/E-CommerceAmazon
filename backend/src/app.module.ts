import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { PaymentModule } from './payment/payment.module';
import { PurchaseModule } from './purchase/purchase.module';
import { PurchaseProductModule } from './purchase-product/purchase-product.module';

@Module({
  imports: [DatabaseModule, ProductsModule, PaymentModule, PurchaseModule, PurchaseProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
