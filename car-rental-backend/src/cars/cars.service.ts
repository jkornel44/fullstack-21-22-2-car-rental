import { EntityRepository, FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Category } from '../categories/entities/category';
import { UserDto } from '../users/dto/user.dto';
import { Model } from '../models/entities/model';
import { CarDto } from './dto/car.dto';
import { Car, CarStatus } from './entities/car';
import { UserRole } from '../users/entities/user';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carRepository: EntityRepository<Car>,
    @InjectRepository(Category)
    private categoryRepository: EntityRepository<Category>,
    @InjectRepository(Model)
    private modelRepository: EntityRepository<Model>,
  ) {}

  async findAll(user: UserDto, carDto?: CarDto): Promise<Car[]> {
    const filters: FilterQuery<Car> = {
      model: { $like: `%${carDto.name || ''}%` },
    };
    
    if (user && user.role === UserRole.User) {
      filters.status = 'READY_TO_USE';
    }

    return await this.carRepository.find(filters, {
      populate: ['categories', 'model', 'model.brand'],
    });
  }

  async findOne(id: number): Promise<Car> {
    return await this.carRepository.findOne({ id }, {populate: ['categories', 'model', 'model.brand']});
  }


  async create(carDto: CarDto): Promise<Car> {
    const car = new Car();
    car.registration_plate = carDto.registration_plate;
    car.color = carDto.color;
    car.price = carDto.price;
    car.purchase_date = carDto.purchase_date;
    car.status = CarStatus.Ready;
    car.image = carDto.image;
    
    if (carDto.model) {
      car.model = this.modelRepository.getReference(carDto.model.id);
    }

    if (carDto.categories) {
      car.categories.set(
        carDto.categories?.map((category) =>
          this.categoryRepository.getReference(category.id)
        )
      );
    }
    car.name = carDto.name;
    await this.carRepository.persistAndFlush(car);
    await car.categories.init();
    await wrap(car.model).init();
    await wrap(car.model.brand).init();
    
    return car;
  }

  async update(id: number, carDto: CarDto) {
    const car = await this.carRepository.findOne({ id });
    car.name = carDto.name || car.name;
    car.color = carDto.color || car.color;
    car.price = carDto.price || car.price;
    car.image = carDto.image || car.image;
    car.purchase_date = carDto.purchase_date || car.purchase_date;
    car.model = carDto.model || car.model;

    if (carDto.categories) {
      car.categories.set(
        carDto.categories.map((category) =>
          this.categoryRepository.getReference(category.id),
        ),
      );
    }

    await this.carRepository.persistAndFlush(car);
    await this.carRepository.populate(car, ['categories', 'model', 'model.brand']);

    return car;
  }

  async lockVehicle(id: number) {
    const car = await this.findOne(id);
    car.status = CarStatus.InUse;

    await this.carRepository.persistAndFlush(car);
    await this.carRepository.populate(car, ['categories', 'model', 'model.brand']);
    
    return car;
  } 
  
  async releaseVehicle(id: number) {
    const car = await this.findOne(id);
    car.status = CarStatus.Ready;

    await this.carRepository.persistAndFlush(car);
    await this.carRepository.populate(car, ['categories', 'model', 'model.brand']);
    
    return car;
  } 
}
