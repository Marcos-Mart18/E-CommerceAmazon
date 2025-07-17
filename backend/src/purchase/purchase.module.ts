import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { Purcharse } from 'src/entities/Purchase';
import { PurchaseProduct } from 'src/entities/PurchaseProduct';
import { PurchaseProductService } from 'src/purchase-product/purchase-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService, PurchaseProductService],
  imports:[TypeOrmModule.forFeature([Purcharse, PurchaseProduct])],
})
export class PurchaseModule {}
