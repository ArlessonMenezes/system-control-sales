import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandModule } from 'src/brand/brand.module';

import { Product } from './model/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product]),
    BrandModule,
    CategoriesModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
