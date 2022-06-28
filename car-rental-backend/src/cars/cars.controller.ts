import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CarDto } from './dto/car.dto';
import { CarsService } from './cars.service';
import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { AllowAnonymous } from '../auth/allow-anonymous';
import { UserParam } from '../auth/user-param.decorator';
import { UserDto } from '../users/dto/user.dto';
import { Roles } from '../auth/roles';
import { UserRole } from '../users/entities/user';
import { CarStatus } from './entities/car';

@Controller('cars')
export class CarsController {
  constructor(private _carsService: CarsService) {}

  @Get()
  async findAll(@UserParam() user: UserDto, @Query() carDto: CarDto): Promise<CarDto[]> {
    const cars = await this._carsService.findAll(user, carDto);
    return cars.map((car) => new CarDto(car));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CarDto> {
    const car = await this._carsService.findOne(id);

    if (!car) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    return new CarDto(car);
  }

  @Patch(':id')
  @Roles(UserRole.Admin)
  async update(@Param('id', ParseIntPipe) id: number, @Body() carDto: CarDto): Promise<CarDto> {
    const newCar = await this._carsService.update(id, carDto);
    return new CarDto(newCar);
  }

  @Patch(':id/lock')
  async lockVehicle(@Param('id', ParseIntPipe) id: number,): Promise<CarDto> {
    const car = await this._carsService.lockVehicle(id);
    if (!car) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    return new CarDto(car);
  }

  @Patch(':id/release')
  async releaseVehicle(@Param('id', ParseIntPipe) id: number,): Promise<CarDto> {
    const car = await this._carsService.releaseVehicle(id);
    if (!car) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    return new CarDto(car);
  }

  @Roles(UserRole.Admin)
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

  @Roles(UserRole.Admin)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const carToRemove = await this._carsService.findOne(id);
    if (carToRemove.status === CarStatus.InUse) {
      throw new HttpException(`Unable to remove car with the following id: ${carToRemove.id} due to an active rent`, HttpStatus.METHOD_NOT_ALLOWED);
    }

    return await this._carsService.remove(+id);
  }
}
