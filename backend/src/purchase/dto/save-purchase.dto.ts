import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsUUID, ValidateNested } from "class-validator";

class ProductDto {
    @IsUUID()
    id: string;
}

class CartProduct{
    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsNumber()
    @IsPositive()
    total: number;

    @ValidateNested()
    @Type(() => ProductDto)
    product: ProductDto;
}

export class SavePurchaseDto {
    @ValidateNested({ each: true })
    @Type(() => CartProduct)
    data: CartProduct[];    
    
    
    @IsNumber()
    @IsPositive()
    total:number;
}