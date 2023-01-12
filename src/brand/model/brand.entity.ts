import { Product } from "src/product/model/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Brand {
@PrimaryGeneratedColumn()
 idBrand: number;

 @Column()
 name: string;

 @CreateDateColumn({ type: 'datetime' })
 created_at: Date;

 @OneToMany(() => Product, product => product.brand)
 products: Product[]
}