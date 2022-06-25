import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from './rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  constructor(private httpClient: HttpClient) { }

  async getRentals(): Promise<any> {
    return (this.httpClient.get('/api/rentals') as Observable<Rental[]>).toPromise();
  }

  async createRental(rental: Rental): Promise<any> {
    return (this.httpClient.post('/api/rentals', rental) as Observable<Rental>).toPromise();
  }
}
