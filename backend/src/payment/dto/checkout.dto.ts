import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsObject, IsPositive, IsString, IsUrl, ValidateNested } from "class-validator";

class ProductDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsUrl()
    urlImg: string;

    @IsNumber()
    @IsPositive()
    price:number;
}


class CheckoutProductDto{
    @IsObject()
    @ValidateNested()
    @Type(()=> ProductDto)
    product: ProductDto

    @IsNumber()
    @IsPositive()
    quantity: number
}

export class CheckoutDto{
    @IsNumber()
    @IsPositive()
    total:number;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type(()=> CheckoutProductDto)
    data: CheckoutProductDto[];
}