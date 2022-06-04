import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { RentalDto } from './dto/rental.dto';
import { Rental } from './entities/rental';
import { RentalsService } from './rentals.service';
import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { LocationDto } from '../Locations/dto/location.dto';
import { UserDto } from '../users/dto/user.dto';
import { UserParam } from '../auth/user-param.decorator';

@Controller('rentals')
export class RentalsController {
  constructor(private _rentalsService: RentalsService) {}

  @Get()
  async findAll(@UserParam() user: UserDto): Promise<RentalDto[]> {
    const rentals = await this._rentalsService.findAll(user);
    return rentals.map((rental) => new RentalDto(rental));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @UserParam() user: UserDto): Promise<RentalDto> {
    const rental = await this._rentalsService.findOne(id, user);

    if (!rental) {
      throw new HttpException('Rental not found', HttpStatus.NOT_FOUND);
    }

    return new RentalDto(rental);
  }

  @Post()
  async create(
    @Body() rentalDto: RentalDto,
    @Param() locationDto: LocationDto,
    @UserParam() userDto: UserDto
  ): Promise<RentalDto> {
    try {
      const newRental = await this._rentalsService.create(rentalDto, userDto, locationDto);
      return new RentalDto(newRental);
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new HttpException('Rental alredy exists', HttpStatus.CONFLICT);
      }
    }
    
  }
}
