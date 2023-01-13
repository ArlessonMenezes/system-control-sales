import { Body, Controller, Post, Put, Get, Param, UseGuards } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('brand')
export class BrandController {
  constructor(
    private readonly brandService: BrandService,
  ){}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createBrand(@Body() createBrand: CreateBrandDto) {
    return this.brandService.createBrand(createBrand);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAllBrands() {
    return this.brandService.getAllBrands();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:idBrand')
  async getBrandById(@Param('idBrand') idBrand: number) {
    return this.brandService.findBrandById(idBrand)
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:idBrand')
  async updateBrand(
    @Param('idBrand') idBrand: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandService.updateBrand(idBrand, updateBrandDto);
  }
}
