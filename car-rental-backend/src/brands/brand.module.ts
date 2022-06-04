import { Module } from '@nestjs/common';
import { BrandsService } from './brand.service';
import { BrandsController } from './brand.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Model } from '../models/entities/model';
import { Brand } from './entities/brand';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Brand, Model] })],
  controllers: [BrandsController],
  providers: [BrandsService]
})
export class BrandsModule {}
