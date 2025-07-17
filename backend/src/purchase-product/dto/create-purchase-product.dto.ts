class ProductDto{
    id:string;
}
class PurchaseDto{
    id:string;
}

export class CreatePurchaseProductDto {
    quantity: number;

    total:number;

    product: ProductDto;

    purchase: PurchaseDto;
}