import { Test, TestingModule } from '@nestjs/testing';
import { BrandsController } from './brand.controller';
import { BrandsService } from './brand.service';

describe('ModelsController', () => {
  let controller: BrandsController;
  let brandsService: any;

  beforeEach(async () => {

    brandsService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [{ provide: BrandsService, useValue: brandsService }],
    }).compile();

    controller = module.get<BrandsController>(BrandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
