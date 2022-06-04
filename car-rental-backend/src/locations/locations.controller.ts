import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationDto } from './dto/location.dto';


@Controller('locations')
export class LocationsController {
  constructor(
    private _locationsService: LocationsService) {}

  @Get()
  async findAll(): Promise<LocationDto[]> {
    const locations = await this._locationsService.findAll();
    return locations.map((location) => new LocationDto(location));
  }

  @Post()
  async create(@Body() locationDto: LocationDto): Promise<LocationDto> {
    try {
      const newLocation = await this._locationsService.create(locationDto);
      return new LocationDto(newLocation);
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new HttpException('Location alredy exists', HttpStatus.CONFLICT);
      } else {
        throw e;
      }
    }
  }
}
