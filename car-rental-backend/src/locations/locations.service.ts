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

    await this.locationRepository.persistAndFlush(location);    
    return location;
  }

  async findOne(id: number): Promise<Location> {
    return await this.locationRepository.findOne({ id });
  }

  async remove(id: number): Promise<void> {
    const location = await this.locationRepository.getReference(id);
    this.locationRepository.removeAndFlush(location);
  }
}
