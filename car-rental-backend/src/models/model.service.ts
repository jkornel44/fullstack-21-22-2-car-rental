import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Car } from '../cars/entities/car';
import { Brand } from '../brands/entities/brand';
import { ModelDto } from './dto/model.dto';
import { Model } from './entities/model';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(Model)
    private modelRepository: EntityRepository<Model>,
    @InjectRepository(Brand)
    private brandRepository: EntityRepository<Brand>,
    @InjectRepository(Car)
    private carRepository: EntityRepository<Car>
  ) {}

  async findAll(modelDto?: ModelDto): Promise<Model[]> {
    return await this.modelRepository.find(
      {
        name : { $like: `%${ modelDto.name || ''}%` }, // todo
      },{
        populate: ['brand']
      }
    );
  }

  async findOne(id: number): Promise<Model> {
    return await this.modelRepository.findOne({ id }, {
      populate: ['brand', 'cars']
    });
  }

  async create(modelDto: ModelDto): Promise<Model> {
    const model = new Model();
    model.name = modelDto.name;
    model.brand = this.brandRepository.getReference(modelDto.brand.id);

    await this.modelRepository.persistAndFlush(model);
    //await model.cars.init();
    await wrap(model.brand).init();

    return model;
  }
}
