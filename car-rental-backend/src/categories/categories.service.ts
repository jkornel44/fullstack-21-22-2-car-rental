import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { Category } from './entities/category';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: EntityRepository<Category>,
  ) {}

  async findAll(categoryDto?: CategoryDto): Promise<Category[]> {
    return await this.categoryRepository.find(categoryDto);
  }

  async create(categoryDto: CategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(categoryDto);
    await this.categoryRepository.persistAndFlush(category);

    return category;
  }
}
