import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from './brand';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient) { }

  async getCategories(): Promise<any> {
    return (this.httpClient.get('/api/categories') as Observable<Category[]>).toPromise();
  }

  async createCategory(category: Category): Promise<any> {
    return (this.httpClient.post('/api/categories', category) as Observable<Category[]>).toPromise();
  }
}
