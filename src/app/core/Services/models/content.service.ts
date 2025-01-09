import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private httpClient: HttpClientService) {}

  getTopContents(pageNumber = 1, pageSize = 12) {
    return this.httpClient.get<any | string>('/Content/GetTopContents', {
      pageNumber: pageNumber,
      pageSize: pageSize,
    });
  }

  getContentById(id: number) {
    return this.httpClient.get<any>(`/Content/${id}`);
  }

  getContentByUserId(userId: string) {
    return this.httpClient.get<any[] | string>(`/Content/GetByUser/${userId}`);
  }

  createContent(content: FormData) {
    return this.httpClient.post<any>('/Content/Create', content, true);
  }

  filterContents(filterRequest: any) {
    return this.httpClient.post<any>('/Content/FilterContents', filterRequest);
  }

  updateContent(id: number, content: FormData) {
    return this.httpClient.put<any>(`/Content/Update/${id}`, content, true);
  }

  getContentAnalysis() {
    return this.httpClient.get<any>('/Content/Statistics');
  }

  deleteContent(id: number) {
    return this.httpClient.delete<any>(`/Content/${id}`);
  }
}
