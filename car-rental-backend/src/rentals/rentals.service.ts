import { EntityRepository, FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User, UserRole } from '../users/entities/user';
import { Location } from '../locations/entities/location';
import { RentalDto } from './dto/rental.dto';
import { Rental } from './entities/rental';
import { UserDto } from '../users/dto/user.dto';
import { LocationDto } from '../Locations/dto/location.dto';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private rentalRepository: EntityRepository<Rental>,
    @InjectRepository(Rental)
    private locationRepository: EntityRepository<Location>,
    @InjectRepository(User)
    private userRepository: EntityRepository<User>,
  ) {}

  async findAll(user: UserDto): Promise<Rental[]> {
    const filters: FilterQuery<Rental> = { user };
    
    if (user.role === UserRole.User) {
      filters.user = { id: user.id };
    }

    return await this.rentalRepository.findAll();
  }

  async findOne(id: number, user: UserDto): Promise<Rental> {
    const filters: FilterQuery<Rental> = { id };
   
    if (user.role === UserRole.User) {
      filters.user = { id: user.id };
    }

    return await this.rentalRepository.findOne(filters);
  }

  async create(rentalDto: RentalDto, userDto: UserDto, locationDto: LocationDto): Promise<Rental> {
    const rental = new Rental();
    rental.pick_up_date = rentalDto.pick_up_date;
    rental.return_date = rentalDto.return_date;
    rental.total_cost = 30000; //todo
    
    rental.pick_up_location = this.locationRepository.getReference(locationDto.id);
    rental.return_location = this.locationRepository.getReference(locationDto.id);
    rental.user = this.userRepository.getReference(userDto.id);
  

    await this.rentalRepository.persistAndFlush(rental);
    await wrap(rental.pick_up_location).init();
    await wrap(rental.return_location).init();
   
    return rental;
  }
}
