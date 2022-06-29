import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Car } from './car';

import { CarService } from './car.service';

describe('CarService', () => {
  let service: CarService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CarService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCars', () => {
    it('should create a get request to /api/cars', async () => {
      const getCarsPromise = service.getCars();

      httpTestingController.expectOne('/api/cars').flush([]);

      await expectAsync(getCarsPromise).toBeResolved();

      httpTestingController.verify();
    });

    it('should return the result of the request', async () => {
      const getCarsPromise = service.getCars();

      httpTestingController.expectOne('/api/cars').flush([]);

      await expectAsync(getCarsPromise).toBeResolvedTo([]);

      httpTestingController.verify();
    });
  });

  describe('getCar', () => {
    it('should create a get request to /api/cars/:id', async () => {
      const getCarPromise = service.getCar(1);

      httpTestingController.expectOne('/api/cars/1').flush([]);

      await expectAsync(getCarPromise).toBeResolved();

      httpTestingController.verify();
    });
  });

  describe('createCar', () => {
    it('should create a post request to /api/cars', async () => {
      const createCarPromise = service.createCar({} as Car);

      httpTestingController.expectOne('/api/cars').flush([]);

      await expectAsync(createCarPromise).toBeResolved();

      httpTestingController.verify();
    });

    it('should return the result of the request', async () => {
      const createCarPromise = service.createCar({} as Car);

      httpTestingController.expectOne('/api/cars').flush({} as Car);

      await expectAsync(createCarPromise).toBeResolvedTo({} as Car);

      httpTestingController.verify();
    });
  });

  describe('updateCar', () => {
    it('should create a post request to /api/cars/:id', async () => {
      const updateCarPromise = service.updateCar('1', {} as Car);

      httpTestingController.expectOne('/api/cars/1').flush([]);

      await expectAsync(updateCarPromise).toBeResolved();

      httpTestingController.verify();
    });

    it('should return the result of the request', async () => {
      const updateCarPromise = service.updateCar('1', {} as Car);

      httpTestingController.expectOne('/api/cars/1').flush({} as Car);

      await expectAsync(updateCarPromise).toBeResolvedTo({} as Car);

      httpTestingController.verify();
    });
  });

  describe('lockCar', () => {
    it('should create a put request to /api/cars/:id/lock', async () => {
      const updateCarPromise = service.lockCar({ id: 1 } as Car);

      httpTestingController.expectOne('/api/cars/1/lock').flush([]);

      await expectAsync(updateCarPromise).toBeResolved();

      httpTestingController.verify();
    });

    it('should return the result of the request', async () => {
      const updateCarPromise = service.lockCar({ id: 1 } as Car);

      httpTestingController.expectOne('/api/cars/1/lock').flush({} as Car);

      await expectAsync(updateCarPromise).toBeResolvedTo({} as Car);

      httpTestingController.verify();
    });
  });

  describe('releaseCar', () => {
    it('should create a put request to /api/cars/:id/release', async () => {
      const updateCarPromise = service.releaseCar({ id: 1 } as Car);

      httpTestingController.expectOne('/api/cars/1/release').flush([]);

      await expectAsync(updateCarPromise).toBeResolved();

      httpTestingController.verify();
    });

    it('should return the result of the request', async () => {
      const updateCarPromise = service.releaseCar({ id: 1 } as Car);

      httpTestingController.expectOne('/api/cars/1/release').flush({} as Car);

      await expectAsync(updateCarPromise).toBeResolvedTo({} as Car);

      httpTestingController.verify();
    });
  });

  describe('deleteCar', () => {
    it('should create a delete request to /api/cars/:id', async () => {
      const updateCarPromise = service.deleteCar(1);

      httpTestingController.expectOne('/api/cars/1').flush([]);

      await expectAsync(updateCarPromise).toBeResolved();

      httpTestingController.verify();
    });
  });
});
