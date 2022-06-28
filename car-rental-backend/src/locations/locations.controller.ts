import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, All, ParseIntPipe } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationDto } from './dto/location.dto';
import { AllowAnonymous } from '../auth/allow-anonymous';
import { Roles } from '../auth/roles';
import { UserRole } from '../users/entities/user';


@Controller('locations')
export class LocationsController {
  constructor(
    private _locationsService: LocationsService) {}

  @AllowAnonymous()
  @Get()
  async findAll(): Promise<LocationDto[]> {
    const locations = await this._locationsService.findAll();
    return locations.map((location) => new LocationDto(location));
  }

  @AllowAnonymous()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<LocationDto> {
    const location = await this._locationsService.findOne(id);

    if (!location) {
      throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
    }

    return new LocationDto(location);
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

  @Patch(':id')
  @Roles(UserRole.Admin)
  async update(@Param('id', ParseIntPipe) id: number, @Body() locationDto: LocationDto): Promise<LocationDto> {
    const locationToUpdate = await this._locationsService.update(id, locationDto);
    return new LocationDto(locationToUpdate);
  }

  @Roles(UserRole.Admin)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const locationToRemove = await this._locationsService.findOne(id);
    if (!locationToRemove) {
      throw new HttpException(`Unable to remove location with the following name: ${locationToRemove.name}`, HttpStatus.METHOD_NOT_ALLOWED);
    }
    return await this._locationsService.remove(+id);
  }
}
