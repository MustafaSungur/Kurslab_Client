import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';
import { Content } from '../../entities/Content';

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
    return this.httpClient.get<Content[] | string>(
      `/Content/GetByUser/${userId}`
    );
  }

  createContent(content: FormData) {
    return this.httpClient.post<any>('/Content/Create', content, true);
  }

  filterContents(filterRequest: any) {
    return this.httpClient.post<any>('/Content/FilterContents', filterRequest);
  }

  updateContent(id: number, content: Content, imageFile: File) {
    return this.httpClient.put<Content | string>(
      `Category/Update/${id}`,
      {
        content: content,
        imageFile: imageFile,
      },
      true
    );
  }

  getContentAnalysis() {
    return this.httpClient.get<any | string>('/Content/Statistics');
  }

  deleteContent(id: number) {
    return this.httpClient.delete<Content | string>(`/Content/Delete/${id}`);
  }
}
