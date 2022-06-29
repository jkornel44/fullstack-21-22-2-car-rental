import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LocationService } from './locarion.service';
import { Location } from './location';


describe('LocationService', () => {
  let service: LocationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LocationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getLocations', () => {
    it('should create a get request to /api/locations', async () => {
      const getPromise = service.getLocations();

      httpTestingController.expectOne('/api/locations').flush([]);

      await expectAsync(getPromise).toBeResolved();

      httpTestingController.verify();
    });

    it('should return the result of the request', async () => {
      const getPromise = service.getLocations();

      httpTestingController.expectOne('/api/locations').flush([]);

      await expectAsync(getPromise).toBeResolvedTo([]);

      httpTestingController.verify();
    });
  });

  describe('getLocation', () => {
    it('should create a get request to /api/locations/:id', async () => {
      const getPromise = service.getLocation('1');

      httpTestingController.expectOne('/api/locations/1').flush([]);

      await expectAsync(getPromise).toBeResolved();

      httpTestingController.verify();
    });
  });

  describe('createLocation', () => {
    it('should create a post request to /api/locations', async () => {
      const createPromise = service.createLocation({} as Location);

      httpTestingController.expectOne('/api/locations').flush([]);

      await expectAsync(createPromise).toBeResolved();

      httpTestingController.verify();
    });

    it('should return the result of the request', async () => {
      const createPromise = service.createLocation({} as Location);

      httpTestingController.expectOne('/api/locations').flush({} as Location);

      await expectAsync(createPromise).toBeResolvedTo({} as Location);

      httpTestingController.verify();
    });
  });

  describe('updateLocation', () => {
    it('should create a post request to /api/locations/:id', async () => {
      const updatePromise = service.updateLocation('1', {} as Location);

      httpTestingController.expectOne('/api/locations/1').flush([]);

      await expectAsync(updatePromise).toBeResolved();

      httpTestingController.verify();
    });

    it('should return the result of the request', async () => {
      const updatePromise = service.updateLocation('1', {} as Location);

      httpTestingController.expectOne('/api/locations/1').flush({} as Location);

      await expectAsync(updatePromise).toBeResolvedTo({} as Location);

      httpTestingController.verify();
    });
  });

  describe('deleteLocation', () => {
    it('should create a delete request to /api/locations/:id', async () => {
      const updatePromise = service.deleteLocation(1);

      httpTestingController.expectOne('/api/locations/1').flush([]);

      await expectAsync(updatePromise).toBeResolved();

      httpTestingController.verify();
    });
  });
});
