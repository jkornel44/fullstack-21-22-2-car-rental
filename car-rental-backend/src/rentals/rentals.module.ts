import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Rental } from './entities/rental';
import { Location } from '../locations/entities/location';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Rental, Location] })],
  providers: [RentalsService],
  controllers: [RentalsController],
})
export class RentalsModule {}
