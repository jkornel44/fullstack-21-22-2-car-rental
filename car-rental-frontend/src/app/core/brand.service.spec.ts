import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Brand } from './brand';
import { BrandService } from './brand.service';

describe('BrandService', () => {
  let service: BrandService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BrandService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBrands', () => {
    it('should create a get request to /api/brands', async () => {
      const getPromise = service.getBrands();

      httpTestingController.expectOne('/api/brands').flush([]);

      await expectAsync(getPromise).toBeResolved();

      httpTestingController.verify();
    });

    it('should return the result of the request', async () => {
      const getPromise = service.getBrands();

      httpTestingController.expectOne('/api/brands').flush([]);

      await expectAsync(getPromise).toBeResolvedTo([]);

      httpTestingController.verify();
    });
  });

  describe('getBrand', () => {
    it('should create a get request to /api/brands/:id', async () => {
      const getPromise = service.getBrand(1);

      httpTestingController.expectOne('/api/brands/1').flush([]);

      await expectAsync(getPromise).toBeResolved();

      httpTestingController.verify();
    });
  });

  describe('createBrand', () => {
    it('should create a post request to /api/brands', async () => {
      const createPromise = service.createBrand({} as Brand);

      httpTestingController.expectOne('/api/brands').flush([]);

      await expectAsync(createPromise).toBeResolved();

      httpTestingController.verify();
    });

    it('should return the result of the request', async () => {
      const createPromise = service.createBrand({} as Brand);

      httpTestingController.expectOne('/api/brands').flush({} as Brand);

      await expectAsync(createPromise).toBeResolvedTo({} as Brand);

      httpTestingController.verify();
    });
  });

  describe('deleteBrand', () => {
    it('should create a delete request to /api/brands/:id', async () => {
      const updatePromise = service.deleteBrand(1);

      httpTestingController.expectOne('/api/brands/1').flush([]);

      await expectAsync(updatePromise).toBeResolved();

      httpTestingController.verify();
    });
  });
});

