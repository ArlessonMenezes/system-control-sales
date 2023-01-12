import { Body, Controller, Post } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Get } from '@nestjs/common/decorators';

@Controller('brand')
export class BrandController {
  constructor(
    private readonly brandService: BrandService,
  ){}

  @Post()
  async createBrand(@Body() createBrand: CreateBrandDto) {
    return this.brandService.createBrand(createBrand);
  }

  @Get()
  async getAllBrands() {
    return this.brandService.getAllBrands();
  }
}
