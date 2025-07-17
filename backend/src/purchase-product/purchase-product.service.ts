import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseProduct } from 'src/entities/PurchaseProduct';
import { Repository } from 'typeorm';
import { CreatePurchaseProductDto } from './dto/create-purchase-product.dto';

@Injectable()
export class PurchaseProductService {
    constructor(
        @InjectRepository(PurchaseProduct)
        private readonly purchaseProductRepository: Repository<PurchaseProduct>
        ){}
    
    async create(createPurchaseProductDto: CreatePurchaseProductDto):Promise<PurchaseProduct>{
        return await this.purchaseProductRepository.save(createPurchaseProductDto);
    }
    
}
