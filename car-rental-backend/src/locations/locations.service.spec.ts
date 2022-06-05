import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from './locations.service';
import { Location } from './entities/location';
import { Rental } from '../rentals/entities/rental';

describe('LocationsService', () => {
  let service: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationsService, 
        { provide: getRepositoryToken(Location), useValue: {} }, 
        { provide: getRepositoryToken(Rental), useValue: {} }
      ],
    }).compile();

    service = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
