import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Model } from './model';
import { ModelService } from './model.service';


describe('ModelService', () => {
  let service: ModelService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ModelService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createModel', () => {
    it('should create a get request to /api/models', async () => {
      const getPromise = service.createModel({} as Model);

      httpTestingController.expectOne('/api/models').flush([]);

      await expectAsync(getPromise).toBeResolved();

      httpTestingController.verify();
    });

    it('should return the result of the request', async () => {
      const getPromise = service.createModel({} as Model);

      httpTestingController.expectOne('/api/models').flush([]);

      await expectAsync(getPromise).toBeResolvedTo([]);

      httpTestingController.verify();
    });
  });
});
