import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CarDto } from './dto/car.dto';
import { Car } from './entities/car';
import { CarsService } from './cars.service';
import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { AllowAnonymous } from '../auth/allow-anonymous';
import { UserParam } from '../auth/user-param.decorator';
import { UserDto } from '../users/dto/user.dto';
import { ModelDto } from 'src/models/dto/model.dto';

@Controller('cars')
export class CarsController {
  constructor(private _carsService: CarsService) {}

  @AllowAnonymous()
  @Get()
  async findAll(@Query() carDto: CarDto): Promise<CarDto[]> {
    const cars = await this._carsService.findAll(carDto);
    return cars.map((car) => new CarDto(car));
  }

  @AllowAnonymous()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CarDto> {
    const car = await this._carsService.findOne(id);

    if (!car) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    return new CarDto(car);
  }

  @AllowAnonymous()
  @Post()
  async create(@Body() carDto: CarDto): Promise<CarDto> {
    try {
      const newCar = await this._carsService.create(carDto);
      return new CarDto(newCar);
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new HttpException('Car alredy exists with the folowing registration plate: ' + carDto.registration_plate, HttpStatus.CONFLICT);
      }
    } 
  }
}
