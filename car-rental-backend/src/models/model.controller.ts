import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ModelsService } from './model.service';
import { ModelDto } from './dto/model.dto';
import { AllowAnonymous } from '../auth/allow-anonymous';


@Controller('models')
export class ModelsController {
  constructor(
    private _modelsService: ModelsService) {}

  @AllowAnonymous()
  @Get()
  async findAll(@Query() modelDto: ModelDto): Promise<ModelDto[]> {
    const models = await this._modelsService.findAll(modelDto);
    return models.map((model) => new ModelDto(model));
  }

  @AllowAnonymous()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ModelDto> {
    const model = await this._modelsService.findOne(id);

    if (!model) {
      throw new HttpException('Model not found', HttpStatus.NOT_FOUND);
    }

    return new ModelDto(model);
  }

  @AllowAnonymous()
  @Post()
  async create(@Body() modelDto: ModelDto): Promise<ModelDto> {
    try {
      const newModel = await this._modelsService.create(modelDto);
      return new ModelDto(newModel);
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new HttpException('Model already exists', HttpStatus.CONFLICT);
      } else {
        throw e;
      }
    }
  }
}
