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

  async getBrand(id: any): Promise<any> {
    return (this.httpClient.get(`/api/brands/${id}`) as Observable<Brand>).toPromise();
  }

  async createBrand(brand: Brand): Promise<any> {
    return (this.httpClient.post('/api/brands', brand) as Observable<Brand[]>).toPromise();
  }

  async deleteBrand(id: number): Promise<any> {
    return (this.httpClient.delete(`/api/brands/${id}`) as Observable<any>).toPromise();
  }
}
