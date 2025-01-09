import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClientService) {}

  getAllCategories() {
    return this.httpClient.get<any>('/Category/GetAll');
  }

  createCategory(category: any) {
    return this.httpClient.post<any>('/Category/Create', category);
  }

  updateCategory(id: number, category: any) {
    return this.httpClient.put<any>(`/Category/Update/${id}`, category);
  }

  deleteCategory(id: number) {
    return this.httpClient.delete<any>(`/Category/Delete/${id}`);
  }
}
