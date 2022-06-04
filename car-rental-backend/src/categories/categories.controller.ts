import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';


@Controller('categories')
export class CategoriesController {
  constructor(
    private _categoriesService: CategoriesService) {}

  @Get()
  async findAll(@Query() categoryDto: CategoryDto): Promise<CategoryDto[]> {
    const categories = await this._categoriesService.findAll(categoryDto);
    return categories.map((category) => new CategoryDto(category));
  }

  @Post()
  async create(@Body() categoryDto: CategoryDto): Promise<CategoryDto> {
    try {
      const newCategory = await this._categoriesService.create(categoryDto);
      return new CategoryDto(newCategory);
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new HttpException('Category alredy exists', HttpStatus.CONFLICT);
      } else {
        throw e;
      }
    }
  }
}
