import { EntityRepository, FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../users/dto/user.dto';
import { Location } from '../locations/entities/location';
import { RentalDto } from './dto/rental.dto';
import { Rental } from './entities/rental';
import { UsersController } from '../users/users.controller';
import { User, UserRole } from '../users/entities/user';
import { Car } from '../cars/entities/car';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private rentalRepository: EntityRepository<Rental>,
    @InjectRepository(Location)
    private locationRepository: EntityRepository<Location>,
    @InjectRepository(User)
    private userRepository: EntityRepository<User>,
    @InjectRepository(Car)
    private carRepository: EntityRepository<Car>
  ) {}

  async findAll(user: UserDto, rentalDto?: RentalDto): Promise<Rental[]> {
    const filters: FilterQuery<Rental> = {
      id : { $like: `%${rentalDto.id || ''}%` },
    };
    if (user.role === UserRole.User) {
      filters.user = { id: user.id };
    }
    return await this.rentalRepository.find(filters, {
      populate: ['pick_up_location','user'],
    });
  }

  async findOne(id: number, user: UserDto): Promise<Rental> {
    const filters: FilterQuery<Rental> = { id };
    if (user.role === UserRole.User) {
      filters.user = { id: user.id };
    }
    return await this.rentalRepository.findOne(filters, {
      populate: ['user', 'pick_up_location'],
    });
  }

  async create(rentalDto: RentalDto, userDto: UserDto): Promise<Rental> {
    const rental = new Rental();
    rental.pick_up_date = rentalDto.pick_up_date;
    rental.return_date = rentalDto.return_date;
    rental.user = this.userRepository.getReference(userDto.id);
    if (rentalDto.pick_up_location) {
      rental.pick_up_location = this.locationRepository.getReference(rentalDto.pick_up_location.id);
    }

    if (rentalDto.return_location) {
      rental.return_location = this.locationRepository.getReference(rentalDto.return_location.id);
    }

    if (rentalDto.car) {
      rental.car = this.carRepository.getReference(rentalDto.car.id);
    }
    
    await this.rentalRepository.persistAndFlush(rental);
    await this.rentalRepository.populate(rental, ['pick_up_location', 'return_location', 'user', 'car']);

    return rental;
  }
}
