import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { PurchaseProduct } from "./PurchaseProduct";
import { NumericColumTransformer } from "src/utils/column-numeric-transformer";

@Entity()
export class Purcharse{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "numeric", precision: 10, scale: 2, transformer: new NumericColumTransformer()})
    total:number;

    @OneToMany(
        () => PurchaseProduct,
        (purchaseProduct) => purchaseProduct.purchase
    )
    purchaseProducts: Relation<PurchaseProduct[]>;
}