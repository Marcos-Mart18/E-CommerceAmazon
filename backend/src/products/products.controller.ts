import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getAll(){
        return await this.productsService.getAll();
    }

    @Get(":id")
    async getById(@Param("id", ParseUUIDPipe) id: string) {
        return await this.productsService.getById(id);
    }
}
