import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from './car';

const baseUrl = 'https://fullstack-beadando.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient: HttpClient) { }

  async getCars(): Promise<any> {
    return (this.httpClient.get('/api/cars') as Observable<Car[]>).toPromise();
  }

  async getCarsById(str: string): Promise<any> {
    return (this.httpClient.get('/api/cars?model=' + str) as Observable<Car[]>).toPromise();
  }

  async getCar(id: number): Promise<any> {
    return (this.httpClient.get(`/api/cars/${id}`) as Observable<Car>).toPromise();
  }

  async createCar(car: Car): Promise<any> {
    return (this.httpClient.post('/api/cars', car) as Observable<Car>).toPromise();
  }

  async updateCar(car: Car): Promise<any> {
    return (this.httpClient.patch('/api/cars', car) as Observable<Car>).toPromise();
  }

  async lockCar(car: Car): Promise<any> {
    return (this.httpClient.patch(`/api/cars/${car.id}/lock`, car) as Observable<Car>).toPromise();
  }

  async releaseCar(car: Car): Promise<any> {
    return (this.httpClient.patch(`/api/cars/${car.id}/release`, car) as Observable<Car>).toPromise();
  }


}
