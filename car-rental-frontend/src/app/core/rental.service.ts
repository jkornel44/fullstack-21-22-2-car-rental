import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from './location';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  constructor(private httpClient: HttpClient) { }

  async getLocations(): Promise<any> {
    return (this.httpClient.get('/api/rentals') as Observable<Rental[]>).toPromise();
  }
}
