import { Brand } from 'src/brand/model/brand.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    idProduct: number;

    @Column({ unique: true })
    name: string;
    
    @Column()
    price: number;
    
    @Column()
    quantity: number;
    
    @Column({ unique: true })
    numberRegister: number;
    
    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;

    @ManyToOne(() => Brand, brand => brand.products, { cascade: true })
    @JoinColumn({ name: 'idBrand' })
    brand: Brand;
}