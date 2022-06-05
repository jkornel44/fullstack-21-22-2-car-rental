import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest, * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Car Rental (e2e)', () => {
  const user = { name: 'Teszt Elekné', userName: 'gizi05', password: 'password' };
  
  let app: INestApplication;
  let requestHandle: supertest.SuperTest<supertest.Test>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(['error']);
    await app.init();

    requestHandle = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Authentication', () => {
    it('should register', async () => {
      await requestHandle.post('/users').send(user).expect(201);
    });

    it('should fail on same user registration', async () => {
      await requestHandle.post('/users').send(user).expect(409);
    });

    it('should login with registered user', async () => {
      await requestHandle.post('/users/login').send(user).expect(201);
    });
  });

  // --- 
  
  describe('Car Controller', () => {
    let token: string;
    let createdCar: Record<string, unknown>;

    beforeAll(() => {
      createdCar = {
        id: 1,
        registration_plate: "ABC-001",
        color: "yellow",
        price: 25000,
        purchase_date: "2022-01-02T00:00:00.000Z",
        model: {
            id: 2
        },
        categories: []
      }
    });

    beforeEach(async () => {
      const loginResponse = await requestHandle.post('/users/login').send(user);
      token = `Bearer ${loginResponse.body.access_token}`;
    });

    describe('/cars', () => {
      it('should return empty array', async () => {
        await requestHandle
          .get('/cars')
          .set('Authorization', token)
          .expect(200)
          .expect([]);
      });

      it('should create a car', async () => {
        const response = await requestHandle
          .post('/cars')
          .set('Authorization', token)
          .send({
            registration_plate: "ABC-001",
            color: "yellow",
            price: 25000,
            purchase_date: "2022-01-02T00:00:00.000Z",
            categories: [{id: 1}],
            model: { id: 2}
          })
        .expect(201);

        expect(response.body).toEqual({
          ...createdCar
        });
      });

      it('should return the newly created car in an array for the user', async () => {
        await requestHandle
          .get('/cars')
          .set('Authorization', token)
          .expect(200)
          .expect([createdCar]);
      });
    });

    describe('/cars/:id', () => {
      it('should return the requested car', async () => {
        await requestHandle
          .get('/cars/1')
          .set('Authorization', token)
          .expect(200)
          .expect((res) => {
            expect(res.body).toEqual({ ...createdCar });
          });
      });

      it('should return 404 when the car does not exist', async () => {
        await requestHandle
          .get('/cars/2')
          .set('Authorization', token)
          .expect(404);
      });
    });
  });

  describe('Brand Controller', () => {
    let token: string;
    let createdBrand: Record<string, unknown>;
    
    beforeAll(() => {
      createdBrand = {
        id: 1,
        name: "Volvo",
        models: []
      }
    });

    beforeEach(async () => {
      const loginResponse = await requestHandle.post('/users/login').send(user);
      token = `Bearer ${loginResponse.body.access_token}`;
    });

    describe('/brands', () => {
      it('should return empty array', async () => {
        await requestHandle
          .get('/brands')
          .set('Authorization', token)
          .expect(200)
          .expect([]);
      });

      it('should create a brand', async () => {
        const response = await requestHandle
          .post('/brands')
          .set('Authorization', token)
          .send({
            name: "Volvo"
          })
        .expect(201);
  
        expect(response.body).toEqual({
          ...createdBrand
        });
      });
  
      it('should return the newly created brand in an array for the user', async () => {
        await requestHandle
          .get('/brands')
          .set('Authorization', token)
          .expect(200)
          .expect([createdBrand]);
      });
    });

    describe('/brands/:id', () => {
      it('should return the requested brand', async () => {
        await requestHandle
          .get('/brands/1')
          .set('Authorization', token)
          .expect(200)
          .expect((res) => {
            expect(res.body).toEqual({ ...createdBrand });
          });
      });

      it('should return 404 when the brand does not exist', async () => {
        await requestHandle
          .get('/brands/2')
          .set('Authorization', token)
          .expect(404);
      });
    });
  });

  describe('Model Controller', () => {
    let token: string;
    let createdModel: Record<string, unknown>;
    
    beforeAll(() => {
      createdModel = {
        id: 1,
        name: "XC90",
        brand: {
          id: 1
        }
      }
    });

    beforeEach(async () => {
      const loginResponse = await requestHandle.post('/users/login').send(user);
      token = `Bearer ${loginResponse.body.access_token}`;
    });

    describe('/models', () => {
      it('should return empty array', async () => {
        await requestHandle
          .get('/models')
          .set('Authorization', token)
          .expect(200)
          .expect([]);
      });

      it('should create a model', async () => {
        const response = await requestHandle
          .post('/models')
          .set('Authorization', token)
          .send({
            name: "XC90",
            brand: { id: 1}
        })
        .expect(201);
  
        expect(response.body).toEqual({
          ...createdModel
        });
      });
  
      it('should return the newly created model in an array for the user', async () => {
        await requestHandle
          .get('/models')
          .set('Authorization', token)
          .expect(200)
          .expect([createdModel]);
      });
    });

    describe('/models/:id', () => {
      it('should return the requested model', async () => {
        await requestHandle
          .get('/models/1')
          .set('Authorization', token)
          .expect(200)
          .expect((res) => {
            expect(res.body).toEqual({ ...createdModel });
          });
      });

      it('should return 404 when the model does not exist', async () => {
        await requestHandle
          .get('/models/2')
          .set('Authorization', token)
          .expect(404);
      });
    });
  });

  describe('Category Controller', () => {
    let token: string;
    let createdCategory: Record<string, unknown>;
    
    beforeAll(() => {
      createdCategory = {
        id: 1,
        name: "SUV",
        description: "Városi terpjárók"
      }
    });

    beforeEach(async () => {
      const loginResponse = await requestHandle.post('/users/login').send(user);
      token = `Bearer ${loginResponse.body.access_token}`;
    });

    describe('/categories', () => {
      it('should return empty array', async () => {
        await requestHandle
          .get('/categories')
          .set('Authorization', token)
          .expect(200)
          .expect([]);
      });

      it('should create a category', async () => {
        const response = await requestHandle
          .post('/categories')
          .set('Authorization', token)
          .send({
            name: "SUV",
            description: "Városi terpjárók"
          })
          .expect(201);
  
        expect(response.body).toEqual({
          ...createdCategory
        });
      });
  
      it('should return the newly created category in an array for the user', async () => {
        await requestHandle
          .get('/categories')
          .set('Authorization', token)
          .expect(200)
          .expect([createdCategory]);
      });
    });
  });

  describe('Location Controller', () => {
    let token: string;
    let createdLocation: Record<string, unknown>;
    
    beforeAll(() => {
      createdLocation = {
        id: 1,
        name: "Liszt Ferenc Nemzetközi Repülőtér",
        postal_code: "1185",
        city: "Budapest",
        street: "Ferihegyi",
        street_type: "ROAD",
        house_no: 1
      }
    });

    beforeEach(async () => {
      const loginResponse = await requestHandle.post('/users/login').send(user);
      token = `Bearer ${loginResponse.body.access_token}`;
    });

    describe('/locations', () => {
      it('should return empty array', async () => {
        await requestHandle
          .get('/locations')
          .set('Authorization', token)
          .expect(200)
          .expect([]);
      });

      it('should create a location', async () => {
        const response = await requestHandle
          .post('/locations')
          .set('Authorization', token)
          .send({
            name: "Liszt Ferenc Nemzetközi Repülőtér",
            postal_code: "1185",
            city: "Budapest",
            street: "Ferihegyi",
            street_type: "ROAD",
            house_no: 1
          })
          .expect(201);
  
        expect(response.body).toEqual({
          ...createdLocation
        });
      });
  
      it('should return the newly created location in an array for the user', async () => {
        await requestHandle
          .get('/locations')
          .set('Authorization', token)
          .expect(200)
          .expect([createdLocation]);
      });
    });
  });

  describe('Rental Controller', () => {
    let token: string;
    let createdLocation: Record<string, unknown>;
    
    beforeAll(() => {
      createdLocation = {
        id: 1,
        pick_up_date: "2022-06-01T00:00:00.000Z",
        return_date: "2022-06-05T00:00:00.000Z",
        total_cost: 30000,
        pick_up_location: {
            id: 1,
            name: "Liszt Ferenc Nemzetközi Repülőtér",
            postal_code: "1185",
            city: "Budapest",
            street: "Ferihegyi",
            street_type: "ROAD",
            house_no: 1
        },
        return_location: {
            id: 1,
            name: "Liszt Ferenc Nemzetközi Repülőtér",
            postal_code: "1185",
            city: "Budapest",
            street: "Ferihegyi",
            street_type: "ROAD",
            house_no: 1
        }
      } 
    });

    beforeEach(async () => {
      const loginResponse = await requestHandle.post('/users/login').send(user);
      token = `Bearer ${loginResponse.body.access_token}`;
    });

    describe('/rentals', () => {
      it('should return empty array', async () => {
        await requestHandle
          .get('/rentals')
          .set('Authorization', token)
          .expect(200)
          .expect([]);
      });

      /*
      it('should create a location', async () => {
        const response = await requestHandle
          .post('/rentals')
          .set('Authorization', token)
          .send({
            pick_up_date: "2022-06-01",
            return_date: "2022-06-05",
            total_cost: 30000,
            pick_up_location: {id:1},
            return_location: {id:1}
        })
          .expect(201);
  
        expect(response.body).toEqual({
          ...createdLocation
        });
      });
      */
    });
  });
});
