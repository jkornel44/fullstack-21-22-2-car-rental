import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Category } from '../categories/entities/category';
import { UserDto } from '../users/dto/user.dto';
import { Model } from '../models/entities/model';
import { CarDto } from './dto/car.dto';
import { Car } from './entities/car';

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

  async findAll(carDto?: CarDto): Promise<Car[]> {
    return await this.carRepository.find(
      {
        id : { $like: `%${ carDto.id || ''}%` }, // todo
      },
      { populate: ['categories', 'model'] },
    );
  }

  async findOne(id: number): Promise<Car> {
    return await this.carRepository.findOne({ id }, {populate: ['categories']});
  }


  async create(carDto: CarDto): Promise<Car> {
    const car = new Car();
    car.registration_plate = carDto.registration_plate;
    car.color = carDto.color;
    car.price = carDto.price;
    car.purchase_date = carDto.purchase_date;
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

 
    await this.carRepository.persistAndFlush(car);
    await car.categories.init();
    await wrap(car.model).init();
    
    return car;
  }
}
