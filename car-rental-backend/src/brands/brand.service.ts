import { EntityRepository, LoadStrategy } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Model } from '../models/entities/model';
import { BrandDto } from './dto/brand.dto';
import { Brand } from './entities/brand';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: EntityRepository<Brand>,
    @InjectRepository(Brand)
    private modelRepository: EntityRepository<Model>
  ) {}

  async findAll(brandDto?: BrandDto): Promise<Brand[]> {
    return await this.brandRepository.find(
      {
        name: { $like: `%${ brandDto.name || ''}%` }, // todo
      }
    );
  }

  async findOne(id: number): Promise<Brand> {
    return await this.brandRepository.findOne({ id }, {
      populate: ['models']
    });
  }

  async create(brandDto: BrandDto): Promise<Brand> {
    const brand = new Brand();
    brand.name = brandDto.name;

    if (brandDto.models) {
      brand.models.set(
        brandDto.models?.map((model) =>
          this.modelRepository.getReference(model.id)
        )
      );
    }
    await this.brandRepository.persistAndFlush(brand);
    await brand.models.init();

    return brand;
  }
}
