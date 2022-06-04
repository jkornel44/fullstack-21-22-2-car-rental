import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Rental } from '../rentals/entities/rental';
import { LocationDto } from './dto/location.dto';
import { Location } from '../locations/entities/location';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: EntityRepository<Location>,
    @InjectRepository(Rental)
    private rentalRepository: EntityRepository<Rental>
  ) {}

  async findAll(): Promise<Location[]> {
    return await this.locationRepository.findAll();
  }

  async create(locationDto: LocationDto): Promise<Location> {
    const location = new Location();
    location.name = locationDto.name;
    location.postal_code = locationDto.postal_code;
    location.city = locationDto.city;
    location.street = locationDto.street;
    location.street_type = locationDto.street_type;
    location.house_no = locationDto.house_no;

    /*
    if (locationDto.rentals_pickup) {
      location.rentals_pickup.set(
        locationDto.rentals_pickup?.map((rental) =>
          this.rentalRepository.getReference(rental.id)
        )
      );
    }

    if (locationDto.rentals_return) {
      location.rentals_return.set(
        locationDto.rentals_return?.map((rental) =>
          this.rentalRepository.getReference(rental.id)
        )
      );
    }

    */

    await this.locationRepository.persistAndFlush(location);
    //await location.rentals_pickup.init();
    //await location.rentals_return.init();
    
    return location;
  }
}
