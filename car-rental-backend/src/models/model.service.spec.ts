import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { ModelsService } from './model.service';
import { Model } from './entities/model';
import { Car } from '../cars/entities/car';
import { Brand } from '../brands/entities/brand';

describe('CategoriesService', () => {
  let service: ModelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModelsService, 
        { provide: getRepositoryToken(Model), useValue: {} },
        { provide: getRepositoryToken(Car), useValue: {} },
        { provide: getRepositoryToken(Brand), useValue: {} },
      ],
    }).compile();

    service = module.get<ModelsService>(ModelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
