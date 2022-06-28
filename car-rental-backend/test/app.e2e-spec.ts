import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest, * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Car Rental (e2e)', () => {
  const user = { name: 'Teszt Elekné', userName: 'gizi05', password: 'password' };
  const admin = { name: 'CarRental Admin', userName: 'admin', password: 'password' };

  
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

  describe('Brand Controller', () => {
    let token: string;
    let createdBrand: Record<string, unknown>;
    let createdBrand2: Record<string, unknown>;

    beforeAll(() => {
      createdBrand = {
        id: 1,
        name: "VOLVO",
        models: []
      }

      createdBrand2 = {
        id: 1,
        name: "VOLVO",
      }
    });

    beforeEach(async () => {
      const loginResponse = await requestHandle.post('/users/login').send(admin);
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
            name: "VOLVO"
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
    let createdModel2: Record<string, unknown>;
    
    beforeAll(() => {
      createdModel = {
        id: 1,
        name: 'V90',
        cars: [],
        brand: {
          id: 1,
          name: 'VOLVO'
        }
      }

      createdModel2 = {
        id: 1,
        name: 'V90',
        brand: {
          id: 1,
          name: 'VOLVO'
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
            name: "V90",
            brand: { 
              id: 1
            }
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
          .expect([createdModel2]);
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
        name: "Kombi",
        description: "5 ajtós kombi jármű"
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
            name: "Kombi",
            description: "5 ajtós kombi jármű"
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
  
  describe('Car Controller', () => {
    let token: string;
    let createdCar: Record<string, unknown>;
    let createdCar2: Record<string, unknown>;

    beforeAll(() => {
      createdCar = {
        id: 1,
        name: 'VOLVO V90',
        registration_plate: "ABC-001",
        color: "yellow",
        price: 25000,
        purchase_date: "2022-01-02T00:00:00.000Z",
        image: 'teszt',
        status: "READY_TO_USE",
        model: {
            id: 1,
            name: 'V90',
            brand: 1
        },
        categories: [{
          id: 1,
          name: "Kombi",
          description: "5 ajtós kombi jármű"
        }]
      }

      createdCar2 = {
        id: 1,
        name: 'VOLVO V90',
        registration_plate: "ABC-001",
        color: "yellow",
        price: 25000,
        purchase_date: "2022-01-02T00:00:00.000Z",
        image: 'teszt',
        status: "READY_TO_USE",
        model: {
            id: 1,
            name: 'V90',
            brand: {
              id: 1,
              name: 'VOLVO'
            }
        },
        categories: [{
          id: 1,
          name: "Kombi",
          description: "5 ajtós kombi jármű"
        }]
      }
    });

    beforeEach(async () => {
      const loginResponse = await requestHandle.post('/users/login').send(admin);
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
            image: 'teszt',
            model: { id: 1}
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
          .expect([createdCar2]);
      });
    });

    describe('/cars/:id', () => {
      it('should return the requested car', async () => {
        await requestHandle
          .get('/cars/1')
          .set('Authorization', token)
          .expect(200)
          .expect((res) => {
            expect(res.body).toEqual({ ...createdCar2 });
          });
      });

      it('should return 404 when the car does not exist', async () => {
        await requestHandle
          .get('/cars/2')
          .set('Authorization', token)
          .expect(404);
      });
    });

    describe('/cars/:id', () => {
      it('should return the requested car', async () => {
        await requestHandle
          .get('/cars/1')
          .set('Authorization', token)
          .expect(200)
          .expect((res) => {
            expect(res.body).toEqual({ ...createdCar2 });
          });
      });

      it('should return 404 when the car does not exist', async () => {
        await requestHandle
          .get('/cars/2')
          .set('Authorization', token)
          .expect(404);
      });

      it('should update the car', async () => {
        const loginResponse = await requestHandle
          .post('/users/login')
          .send({ userName: 'admin', password: 'password' });
        const otherToken = `Bearer ${loginResponse.body.access_token}`;
  
        await requestHandle
          .patch('/cars/1')
          .set('Authorization', otherToken)
          .send({
            model: 'V90 Cross Country'
          })
          .expect(200)
          .expect({
            id: 1,
            registration_plate: 'ABC-001',
            color: 'yellow',
            price: 25000,
            purchase_date: '2022-01-02T00:00:00.000Z',
            model: { id: 'V90 Cross Country' },
            status: 'READY_TO_USE',
            image: 'teszt',
            categories: [ { id: 1, name: 'Kombi', description: '5 ajtós kombi jármű' } ]
          });
      });
    });

    describe('/cars/:id/lock', () => {
      it('should return the locked car', async () => {
        await requestHandle
          .patch('/cars/1/lock')
          .set('Authorization', token)
          .expect(200)
          .expect((res) => {
            expect(res.body).toEqual(
              {
                categories:  [
                  {
                    description: "5 ajtós kombi jármű",
                    id: 1,
                    name: "Kombi",
                  },
                ],
                color: "yellow",
                id: 1,
                image: "teszt",
                model: {
                  id: "V90 Cross Country",
                },
                price: 25000,
                purchase_date: "2022-01-02T00:00:00.000Z",
                registration_plate: "ABC-001",
                status: "IN_USE",
              }
            );
          });
        });
      });

      describe('/cars/:id/release', () => {
        it('should return the released car', async () => {
          await requestHandle
            .patch('/cars/1/release')
            .set('Authorization', token)
            .expect(200)
            .expect((res) => {
              expect(res.body).toEqual(
                {
                  categories:  [
                    {
                      description: "5 ajtós kombi jármű",
                      id: 1,
                      name: "Kombi",
                    },
                  ],
                  color: "yellow",
                  id: 1,
                  image: "teszt",
                  model: {
                    id: "V90 Cross Country",
                  },
                  price: 25000,
                  purchase_date: "2022-01-02T00:00:00.000Z",
                  registration_plate: "ABC-001",
                  status: "READY_TO_USE",
                }
              );
            });
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

    describe('/locations/:id', () => {
      it('should return the requested location', async () => {
        await requestHandle
          .get('/locations/1')
          .set('Authorization', token)
          .expect(200)
          .expect((res) => {
            expect(res.body).toEqual(createdLocation);
          });
      });

      it('should return 404 when the location does not exist', async () => {
        await requestHandle
          .get('/locations/2')
          .set('Authorization', token)
          .expect(404);
      });

      it('should update the location', async () => {
        const loginResponse = await requestHandle
          .post('/users/login')
          .send({ userName: 'admin', password: 'password' });
        const otherToken = `Bearer ${loginResponse.body.access_token}`;
  
        await requestHandle
          .patch('/locations/1')
          .set('Authorization', otherToken)
          .send({
            name: 'Zsámbék'
          })
          .expect(200)
          .expect({
            id: 1,
            name: 'Zsámbék',
            postal_code: '1185',
            city: 'Budapest',
            street: 'Ferihegyi',
            street_type: 'ROAD',
            house_no: 1
          });
      });

      it('should delete the selected location', async () => {
        const loginResponse = await requestHandle
          .post('/users/login')
          .send({ userName: 'admin', password: 'password' });
        const otherToken = `Bearer ${loginResponse.body.access_token}`;
  
        await requestHandle
          .delete('/locations/1')
          .set('Authorization', otherToken)
          .expect(200);
      });
    });
  });

  describe('Rental Controller', () => {
    let token: string;
    let createdRental: Record<string, unknown>;
    
    beforeAll(() => {
      createdRental = {
        total_cost: 25000,
        car: {
          color: "yellow",
          id: 1,
          image: "teszt",
          model: "V90 Cross Country",
          name: null,
          price: 25000,
          purchase_date: "2022-01-02T00:00:00.000Z",
          registration_plate: "ABC-001",
          status: "READY_TO_USE",
        },
        id: 1,
        pick_up_date: "2022-06-01T00:00:00.000Z",
        pick_up_location: {
          id: 1,
        },
        return_date: null,
        return_location: {
          id: 1,
        },
        user: {
          id: 3,
          name: "Teszt Elekné",
          role: "USER",
        },
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

      it('should create a rental', async () => {
        const response = await requestHandle
          .post('/rentals')
          .set('Authorization', token)
          .send(createdRental)
          .expect(201);
  
        expect(response.body).toEqual(
          createdRental
        );
      });
  
      it('should return the newly created rental in an array for the user', async () => {
        await requestHandle
          .get('/rentals')
          .set('Authorization', token)
          .expect(200)
          .expect([{
            id: 1,
            pick_up_date: '2022-06-01T00:00:00.000Z',
            return_date: null,
            total_cost: 25000,
            pick_up_location: { id: 1 },
            return_location: { id: 1 },
            car: {
              id: 1,
              name: null,
              registration_plate: 'ABC-001',
              color: 'yellow',
              image: 'teszt',
              price: 25000,
              status: 'READY_TO_USE',
              purchase_date: '2022-01-02T00:00:00.000Z',
              model: 'V90 Cross Country'
            },
            user: { id: 3, name: 'Teszt Elekné', role: 'USER' }
          }]);
      });
    });
  });
});
