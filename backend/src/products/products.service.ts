import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/Product';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>) {}

    async getAll():Promise<Product[]>{
        return await this.productRepository.find();
    }

    async getById(id: string): Promise<Product> {
        const product = await this.productRepository.findOneBy({ id });
        if(!product){
            throw new NotFoundException({message: "Product not found with id: " + id});
        }

        return product;
    }
}
