import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, ParseIntPipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ModelsService } from './model.service';
import { ModelDto } from './dto/model.dto';
import { AllowAnonymous } from '../auth/allow-anonymous';
import { FileInterceptor } from '@nestjs/platform-express/multer';


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
  @UseInterceptors(FileInterceptor('image', {
    dest: 'uploads'
  }))
  async create(@Body() modelDto: ModelDto, @UploadedFile() image): Promise<ModelDto> {
    try {
      console.log(image);
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
