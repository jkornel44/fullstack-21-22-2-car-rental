import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Car } from './entities/car';
import { Category } from '../categories/entities/category';
import { Model } from '../models/entities/model';
import { Rental } from '../rentals/entities/rental';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Car, Category, Model, Rental] })],
  providers: [CarsService],
  controllers: [CarsController],
})
export class CarsModule {}
