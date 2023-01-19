import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './model/category.entity';
import { CategoryRepository } from './model/category.repository';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: CategoryRepository,
  ){}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({
       name: createCategoryDto.name 
    });

    if (category) throw new BadRequestException('Category already exists.');

    const newCategory = this.categoryRepository.create(createCategoryDto);

    return this.categoryRepository.save(newCategory);
  }

  async getOneCategoryById(idCategory: number) {
    const category = await this.categoryRepository.findOne({
      where: {idCategory}, 
      relations: ['product'],
    });

    if (!category) throw new NotFoundException('Category not found.');

    return category;
  }

  async getAllCategories() {
    return this.categoryRepository.find();
  }
}
