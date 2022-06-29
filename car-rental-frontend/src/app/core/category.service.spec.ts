import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Category } from './category';

import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCategories', () => {
    it('should create a get request to /api/categories', async () => {
      const getPromise = service.getCategories();

      httpTestingController.expectOne('/api/categories').flush([]);

      await expectAsync(getPromise).toBeResolved();

      httpTestingController.verify();
    });

    it('should return the result of the request', async () => {
      const getPromise = service.getCategories();

      httpTestingController.expectOne('/api/categories').flush([]);

      await expectAsync(getPromise).toBeResolvedTo([]);

      httpTestingController.verify();
    });
  });

  describe('createCategory', () => {
    it('should create a post request to /api/categories', async () => {
      const createPromise = service.createCategory({} as Category);

      httpTestingController.expectOne('/api/categories').flush([]);

      await expectAsync(createPromise).toBeResolved();

      httpTestingController.verify();
    });

    it('should return the result of the request', async () => {
      const createPromise = service.createCategory({} as Category);

      httpTestingController.expectOne('/api/categories').flush({} as Category);

      await expectAsync(createPromise).toBeResolvedTo({} as Category);

      httpTestingController.verify();
    });
  });
});
