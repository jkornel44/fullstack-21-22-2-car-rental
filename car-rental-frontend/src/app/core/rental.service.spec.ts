import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Rental } from './rental';
import { RentalService } from './rental.service';


describe('RentalService', () => {
  let service: RentalService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RentalService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRentals', () => {
    it('should create a get request to /api/rentals', async () => {
      const getPromise = service.getRentals();

      httpTestingController.expectOne('/api/rentals').flush([]);

      await expectAsync(getPromise).toBeResolved();

      httpTestingController.verify();
    });

    it('should return the result of the request', async () => {
      const getPromise = service.getRentals();

      httpTestingController.expectOne('/api/rentals').flush([]);

      await expectAsync(getPromise).toBeResolvedTo([]);

      httpTestingController.verify();
    });
  });

  describe('createRental', () => {
    it('should create a post request to /api/rentals', async () => {
      const createPromise = service.createRental({} as Rental);

      httpTestingController.expectOne('/api/rentals').flush([]);

      await expectAsync(createPromise).toBeResolved();

      httpTestingController.verify();
    });

    it('should return the result of the request', async () => {
      const createPromise = service.createRental({} as Rental);

      httpTestingController.expectOne('/api/rentals').flush({} as Rental);

      await expectAsync(createPromise).toBeResolvedTo({} as Rental);

      httpTestingController.verify();
    });
  });

  describe('updateRental', () => {
    it('should create a post request to /api/cars/:id', async () => {
      const updatePromise = service.updateRental(1, {} as Rental);

      httpTestingController.expectOne('/api/rentals/1').flush([]);

      await expectAsync(updatePromise).toBeResolved();

      httpTestingController.verify();
    });

    it('should return the result of the request', async () => {
      const updatePromise = service.updateRental(1, {} as Rental);

      httpTestingController.expectOne('/api/rentals/1').flush({} as Rental);

      await expectAsync(updatePromise).toBeResolvedTo({} as Rental);

      httpTestingController.verify();
    });
  });
});

