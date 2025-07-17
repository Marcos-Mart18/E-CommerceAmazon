import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation} from "typeorm";
import { Product } from "./Product";
import { Purcharse } from "./Purchase";
import { NumericColumTransformer } from "src/utils/column-numeric-transformer";

@Entity()
export class PurchaseProduct {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "numeric", precision: 10, scale: 2, transformer: new NumericColumTransformer()})
    total: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Product, (product) => product.purchaseProducts)
    product: Relation<Product>;
    
    @ManyToOne(() => Purcharse, (purcharse) => purcharse.purchaseProducts)
    purchase: Relation<Purcharse>;
}