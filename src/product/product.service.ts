import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandService } from 'src/brand/brand.service';

import { CreateProductDto } from './dto/create-product.dto';
import { SaleProductDto } from './dto/sale-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IAddProduct } from './model/interface/add-product.interface';
import { Product } from './model/product.entity';
import { ProductRepository } from './model/product.repository';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: ProductRepository,
    private readonly brandService: BrandService,
    private readonly categoriesService: CategoriesService,
  ){}

  async createProduct(createProduct: CreateProductDto) {
    const product = await this.productRepository.findOneBy({
        numberRegister: createProduct.numberRegister 
    });

    if (product) throw new BadRequestException('Product already exists.');

    const brand = await this.brandService.findBrandById(createProduct.idBrand);
    delete brand.products;

    const category = await this.categoriesService.getOneCategoryById(
      createProduct.idCategory
    );
    delete category.product;

    const newProduct = this.productRepository.create(createProduct);
    newProduct.brand  = brand;
    newProduct.category = category;
    
    return this.productRepository.save(newProduct);
  }

  async getAllProducts() {
    return this.productRepository.find({
      relations: ['brand', 'category']
    });
  }

  async findProductById(idProduct: number) {
    const product = await this.productRepository.findOne({
      where: { idProduct },
      relations: ['brand', 'category']
    });

    if (!product) throw new NotFoundException('Product not found.');

    return product;
  }

  async updateProduct(idProduct: number, updateProductDto: UpdateProductDto) {
    const product = await this.findProductById(idProduct);

    //const updateProduct = Object.assign(product, updateProductDto);
    const updateProduct = await this.productRepository.update(product.idProduct, {...updateProductDto});

    return updateProduct;
  }

  async deleteProduct(idProduct: number) {
    const product = await this.findProductById(idProduct)

    await this.productRepository.remove(product);
  }

  async saleProduct(sale: SaleProductDto) {
    const product = await this.findProductById(sale.idProduct);
     
    const value = sale.value >= product.price;
    
    if (value === false) throw new BadRequestException('No enough money.')
    
    if (product.quantity >= sale.quantity) {
      product.quantity = product.quantity - sale.quantity
      } else {
        throw new BadRequestException('Out of stock.')
      }

    await this.productRepository.save(product);

    return {
      sale,
      product
    }
  }

  async addProduct(addProduct: IAddProduct) {
    const product = await this.findProductById(addProduct.idProduct);

    product.quantity += addProduct.quantity;

    await this.productRepository.save(product);

    return { success: "Product added" };
  }
}
