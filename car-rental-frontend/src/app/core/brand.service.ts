import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from './brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private httpClient: HttpClient) { }

  async getBrands(): Promise<any> {
    return (this.httpClient.get('/api/brands') as Observable<Brand[]>).toPromise();
  }
}
