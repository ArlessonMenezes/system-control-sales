import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from '../../product/model/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  idCategory: number;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @OneToMany(() => Product, product => product.category)
  product: Product[];
}