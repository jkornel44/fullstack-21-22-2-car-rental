import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Location } from '../locations/entities/location';
import { RentalDto } from './dto/rental.dto';
import { Rental } from './entities/rental';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private rentalRepository: EntityRepository<Rental>,
    @InjectRepository(Rental)
    private locationRepository: EntityRepository<Location>,
  ) {}

  async findAll(): Promise<Rental[]> {
    return await this.rentalRepository.findAll();
  }

  async findOne(id: number): Promise<Rental> {
    return await this.rentalRepository.findOne({ id });
  }

  async create(rentalDto: RentalDto): Promise<Rental> {
    const rental = new Rental();
    rental.pick_up_date = rentalDto.pick_up_date;
    rental.return_date = rentalDto.return_date;
    rental.total_cost = 30000; //todo
    if (rentalDto.pick_up_location) {
      rental.pick_up_location = this.locationRepository.getReference(rentalDto.pick_up_location.id);
    }

    if (rentalDto.return_location) {
      rental.return_location = this.locationRepository.getReference(rentalDto.return_location.id);
    }

    await this.rentalRepository.persistAndFlush(rental);
    await wrap(rental.pick_up_location).init();
    await wrap(rental.return_location).init();
   
    return rental;
  }
}
