import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

describe('CarsController', () => {
  let controller: CarsController;
  let carsService: any;

  beforeEach(async () => {
    carsService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [{ provide: CarsService, useValue: carsService }],
    }).compile();

    controller = module.get<CarsController>(CarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should give empty array when no issues have been created', () => {
    carsService.findAll.mockReturnValue([]);
    expect(controller.findAll({})).resolves.toEqual([]);
  });

  it('should throw an error when the requested issue is missing', () => {
    carsService.findOne.mockReturnValue(undefined);
    expect(controller.findOne(1)).rejects.toThrow();
  });
});
