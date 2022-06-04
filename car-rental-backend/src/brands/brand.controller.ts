import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { AllowAnonymous } from '../auth/allow-anonymous';
import { BrandsService } from './brand.service';
import { BrandDto } from './dto/brand.dto';


@Controller('brands')
export class BrandsController {
  constructor(
    private _brandsService: BrandsService) {}

  @AllowAnonymous()
  @Get()
  async findAll(@Query() brandDto: BrandDto): Promise<BrandDto[]> {
    const brands = await this._brandsService.findAll(brandDto);
    return brands.map((brand) => new BrandDto(brand));
  }

  @AllowAnonymous()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<BrandDto> {
    const model = await this._brandsService.findOne(id);

    if (!model) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }

    return new BrandDto(model);
  }

  @Post()
  async create(@Body() brandDto: BrandDto): Promise<BrandDto> {
    try {
      const newBrand = await this._brandsService.create(brandDto);
      return new BrandDto(newBrand);
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new HttpException('Brand already exists', HttpStatus.CONFLICT);
      } else {
        throw e;
      }
    }
  }
}
