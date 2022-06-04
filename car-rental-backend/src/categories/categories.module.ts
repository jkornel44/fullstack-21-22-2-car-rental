import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Category } from './entities/category';
import { Car } from '../cars/entities/car';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Category, Car] })],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
