import { Product } from "./product";

interface CartProduct{
    product:Product;
    quantity:number;
    total:number;
}

export interface SavePurchaseDto {
    total:number;
    data:CartProduct[];
}
