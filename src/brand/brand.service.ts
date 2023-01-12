import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateBrandDto } from './dto/create-brand.dto';
import { BrandRepository } from './model/brand.repository';
import { Brand } from './model/brand.entity';
import { ProductService } from '../product/product.service';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: BrandRepository,
  ){}

  async createBrand(createBrand: CreateBrandDto) {
    const brand = await this.brandRepository.findOneBy({ name: createBrand.name });

    if (brand) throw new NotFoundException('Brand already exists.');

    const newBrand = this.brandRepository.create(createBrand);

    return this.brandRepository.save(newBrand);
  }

  async findBrandById(idBrand: number) {
    const brand =  this.brandRepository.findOne({
      where: { idBrand },
      relations: ['products']
    });

    if (!brand) throw new NotFoundException('Brand not found.');

    return brand;
  }

  async getAllBrands() {
    return this.brandRepository.find({
      relations: ['products']
    })
  }
}
