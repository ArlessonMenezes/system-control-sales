import { Body, Controller, Get, Param, Post, UseGuards, ParseIntPipe } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
  ){}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createCategory(@Body() category: CreateCategoryDto) {
    return this.categoriesService.createCategory(category);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:idCategory')
  async getOneCategory(@Param('idCategory', ParseIntPipe) idCategory: number) {
    return this.categoriesService.getOneCategoryById(idCategory);
  }
}
