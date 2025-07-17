import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { PurchaseProduct } from "./PurchaseProduct";
import { NumericColumTransformer } from "src/utils/column-numeric-transformer";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({type: "text"})
    description: string;

    @Column({type: "numeric",precision: 10, scale: 2, transformer: new NumericColumTransformer()})
    price: number;

    @Column({type: "numeric",precision: 10, scale: 2,nullable: true, transformer: new NumericColumTransformer()})
    previousPrice: number;

    @Column()
    urlImg:string;

    @Column()
    reviews: number;

    @OneToMany(()=> PurchaseProduct , (purchaseProduct) => purchaseProduct.product)
    purchaseProducts: Relation<PurchaseProduct[]>;
}