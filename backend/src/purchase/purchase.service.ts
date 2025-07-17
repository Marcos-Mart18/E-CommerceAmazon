import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Purcharse } from 'src/entities/Purchase';
import { PurchaseProductService } from 'src/purchase-product/purchase-product.service';
import { Repository } from 'typeorm';
import { SavePurchaseDto } from './dto/save-purchase.dto';
import { CreatePurchaseProductDto } from 'src/purchase-product/dto/create-purchase-product.dto';

@Injectable()
export class PurchaseService {
    constructor(
        @InjectRepository(Purcharse)
        private readonly purchaseRepository: Repository<Purcharse>,
        private readonly purcharseProductService: PurchaseProductService
        ){}

        async save(savePurchaseDto: SavePurchaseDto){
            const {total,data}= savePurchaseDto;

            const purchase = await this.purchaseRepository.save({total});

            const purchaseProducts = data.map((dto) => {
                return {
                    ...dto,
                    purchase:{
                    id: purchase.id
                    },
                };
            });

            this.savePurchaseProducts(purchaseProducts);
            return{
                message: "Purchase Saved Successfully",
            }
        }

        private async savePurchaseProducts(data: CreatePurchaseProductDto[]) {
            for(const dto of data){
                await this.purcharseProductService.create(dto);
            }
        }
}
