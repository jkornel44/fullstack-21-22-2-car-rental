import { Test, TestingModule } from '@nestjs/testing';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';

describe('RentalsController', () => {
  let controller: RentalsController;
  let rentalsService: any;

  beforeEach(async () => {
    rentalsService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalsController],
      providers: [{ provide: RentalsService, useValue: rentalsService }],
    }).compile();

    controller = module.get<RentalsController>(RentalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should give empty array when no issues have been created', () => {
    rentalsService.findAll.mockReturnValue([]);
    expect(controller.findAll({})).resolves.toEqual([]);
  });

  it('should throw an error when the requested issue is missing', () => {
    rentalsService.findOne.mockReturnValue(undefined);
    expect(controller.findOne(1)).rejects.toThrow();
  });
});
