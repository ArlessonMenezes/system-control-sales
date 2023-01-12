import { Controller, ParseIntPipe } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common/decorators';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { SaleProductDto } from './dto/sale-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { IAddProduct } from './model/interface/add-product.interface';
import { Patch } from '@nestjs/common/decorators/http/request-mapping.decorator';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ){}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(@Body() product: CreateProductDto) {
    return this.productService.createProduct(product);
  };

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/sale')
  async saleProduct(
    @Body() sale: SaleProductDto) {
      return this.productService.saleProduct(sale);        
    }
  
    @UseGuards(JwtAuthGuard)
    @Put('/update/:idProduct')
    async updateProduct(
      @Param('idProduct', ParseIntPipe) idProduct: number, 
      @Body() updateProduct: UpdateProductDto)
      {
        return this.productService.updateProduct(idProduct, updateProduct)
      }

    @UseGuards(JwtAuthGuard)
    @Get('/:idProduct')
    async getOneProduct(
      @Param('idProduct', ParseIntPipe) idProduct: number)
      {
        return this.productService.findProductById(idProduct);
      }

    @UseGuards(JwtAuthGuard)
    @Patch('/add-product')
    async addProduct(@Body() addProduct: IAddProduct,) {
      return this.productService.addProduct(addProduct);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:idProduct')
    async deleteProduct(
      @Param('idProduct', ParseIntPipe) idProduct: number)
    {
      return this.productService.deleteProduct(idProduct);
    }
}
