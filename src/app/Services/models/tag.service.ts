import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';
import { Tag } from '../../entities/Tag';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private httpClient: HttpClientService) {}

  getAllTag() {
    return this.httpClient.get<any>('/Tag/GetAll');
  }

  createTag(tag: Tag) {
    return this.httpClient.post<any>('/Tag/Create', tag);
  }

  updateTag(id: number, tag: Tag) {
    return this.httpClient.put<any>(`/Tag/Update/${id}`, tag);
  }

  deleteTag(id: number) {
    return this.httpClient.delete<any>(`/Tag/Delete/${id}`);
  }
}
