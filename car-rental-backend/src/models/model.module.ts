import { Module } from '@nestjs/common';
import { ModelsService } from './model.service';
import { ModelsController } from './model.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Model } from './entities/model';
import { Car } from '../cars/entities/car';
import { Brand } from '../brands/entities/brand';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Model, Car, Brand] })],
  controllers: [ModelsController],
  providers: [ModelsService]
})
export class ModelsModule {}
