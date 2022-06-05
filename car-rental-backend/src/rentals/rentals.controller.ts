import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { RentalDto } from './dto/rental.dto';
import { RentalsService } from './rentals.service';
import { UserDto } from '../users/dto/user.dto';
import { UserParam } from '../auth/user-param.decorator';

@Controller('rentals')
export class RentalsController {
  constructor(private _rentalsService: RentalsService) {}

  @Get()
  async findAll(
    @Query() rentalDto: RentalDto,
    @UserParam() user: UserDto,
  ): Promise<RentalDto[]> {
    const rentals = await this._rentalsService.findAll(user, rentalDto);
    return rentals.map((rental) => new RentalDto(rental));
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @UserParam() userDto: UserDto,
  ): Promise<RentalDto> {
    const issue = await this._rentalsService.findOne(id, userDto);

    if (!issue) {
      throw new HttpException('Rental not found', HttpStatus.NOT_FOUND);
    }

    return new RentalDto(issue);
  }

  @Post()
  async create(@Body() rentalDto: RentalDto, @UserParam() userDto: UserDto): Promise<RentalDto> {
    const newRental = await this._rentalsService.create(rentalDto, userDto);
    return new RentalDto(newRental);
  }
}
