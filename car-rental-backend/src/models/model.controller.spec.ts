import { Test, TestingModule } from '@nestjs/testing';
import { ModelsController } from './model.controller';
import { ModelsService } from './model.service';

describe('ModelsController', () => {
  let controller: ModelsController;
  let modelsService: any;

  beforeEach(async () => {

    modelsService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModelsController],
      providers: [{ provide: ModelsService, useValue: modelsService }],
    }).compile();

    controller = module.get<ModelsController>(ModelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
