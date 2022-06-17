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

  async searchCars(str: string): Promise<any> {
    return (this.httpClient.get('/api/cars/search?query=' + str) as Observable<Car[]>).toPromise();
  }

  async getCar(id: number): Promise<any> {
    return (this.httpClient.get(`/api/cars/${id}`) as Observable<Car>).toPromise();
  }

  async createCar(car: Car): Promise<any> {
    return (this.httpClient.post('/api/cars', car) as Observable<Car>).toPromise();
  }

  /*
    async getIssues(): Promise<Issue[]> {
    return (
      this.httpClient.get('/api/issues') as Observable<Issue[]>
    ).toPromise();
  }
  */
}

/*
  private cars: Car[] = [
    {
      id: 1,
      registration_plate: "ABC-001",
      color: "red",
      image: './assets/imgs/volvo-v90.png',
      purchase_date: "2022-01-01",
      price: 20000,
      model: "V90",
      brand: "VOLVO",
      categories: [
        { id: 1, name: "plug-in hybrid", color: "#2a9d8f"},
        { id: 2, name: "ÚJ", color: "#e76f51"},
        { id: 3, name: "Apple CarPlay", color: "#231942"},
      ]
    },
    {
      id: 2,
      registration_plate: "ABC-001",
      color: "red",
      purchase_date: "2022-01-01",
      price: 20000,
      image: './assets/imgs/tesla-model3.png',
      model: "MODEL3",
      brand: "TESLA",
      categories: [
        { id: 1, name: "elektromos", color: "#2a9d8f"},
        { id: 2, name: "automata", color: "#14213d"},
      ]
    },
    {
      id: 3,
      registration_plate: "ABC-001",
      color: "red",
      purchase_date: "2022-01-01",
      price: 20000,
      image: './assets/imgs/skoda-octavia.png',
      model: "OCTAVIA",
      brand: "SKODA",
      categories: [
        { id: 1, name: "benzin", color: "#2a9d8f"},
        { id: 2, name: "kézi váltó", color: "#14213d"},
      ]
    },
    {
      id: 4,
      registration_plate: "ABC-001",
      color: "red",
      purchase_date: "2022-01-01",
      price: 20000,
      image: './assets/imgs/ford-transit.png',
      model: "TRANSIT",
      brand: "FORD",
      categories: [
        { id: 1, name: "haszongépjármű", color: "#2a9d8f"}
      ]
    },
    {
      id: 5,
      registration_plate: "ABC-001",
      color: "red",
      purchase_date: "2022-01-01",
      price: 20000,
      image: './assets/imgs/bmw-i3.png',
      model: "I3",
      brand: "BMW",
      categories: [
        { id: 1, name: "elektromos", color: "#2a9d8f"}
      ]
    }
  ];
*/
