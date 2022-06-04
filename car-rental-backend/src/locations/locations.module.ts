import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Location } from './entities/location';
import { Rental } from '../rentals/entities/rental';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Location, Rental] })],
  controllers: [LocationsController],
  providers: [LocationsService]
})
export class LocationsModule {}
