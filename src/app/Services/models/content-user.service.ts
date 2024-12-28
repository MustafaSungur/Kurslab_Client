import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';
import { ContentUser } from '../../entities/ContentUser';

@Injectable({
  providedIn: 'root',
})
export class ContentUserService {
  constructor(private httpClient: HttpClientService) {}

  viewedContent(contentId: number, userId: string) {
    return this.httpClient.post<any>('/ContentUser/Create', {
      contentId,
      userId,
    });
  }

  getHistory(userId: string) {
    return this.httpClient.get<any>(`/ContentUser/GetByUser/${userId}`);
  }
}
