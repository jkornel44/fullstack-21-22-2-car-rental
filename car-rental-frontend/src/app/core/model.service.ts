import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Model } from './model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  constructor(private httpClient: HttpClient) { }

  async createModel(model: Model): Promise<any> {
    return (this.httpClient.post('/api/models', model) as Observable<Model[]>).toPromise();
  }
}
