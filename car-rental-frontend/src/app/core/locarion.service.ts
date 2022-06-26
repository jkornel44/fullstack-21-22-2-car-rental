import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from './location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private httpClient: HttpClient) { }

  async getLocations(): Promise<any> {
    return (this.httpClient.get('/api/locations') as Observable<Location[]>).toPromise();
  }

  async createLocation(location: Location): Promise<any> {
    return (this.httpClient.post('/api/locations', location) as Observable<Location>).toPromise();
  }

  async deleteLocation(id: number): Promise<any> {
    return (this.httpClient.delete(`/api/locations/${id}`) as Observable<any>).toPromise();
  }
}
