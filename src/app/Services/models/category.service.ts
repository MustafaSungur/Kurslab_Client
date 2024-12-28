import { Injectable } from '@angular/core';
import { Category } from '../../entities/Category';
import { HttpClientService } from '../httpclient.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClientService) {}

  getAllCategories() {
    return this.httpClient.get<any>('/Category/GetAll');
  }

  createCategory(category: Category) {
    return this.httpClient.post<any>('/Category/Create', category);
  }

  updateCategory(id: number, category: Category) {
    return this.httpClient.put<any>(`/Category/Update/${id}`, category);
  }

  deleteCategory(id: number) {
    return this.httpClient.delete<any>(`/Category/Delete/${id}`);
  }
}
