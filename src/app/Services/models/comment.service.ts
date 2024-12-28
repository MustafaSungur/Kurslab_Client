import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';
import { Comment } from '../../entities/Comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private httpClient: HttpClientService) {}

  createComment(comment: any) {
    return this.httpClient.post<any>('/Comment/Create', comment);
  }

  updateComment(id: number, comment: any) {
    console.log(id, comment);
    return this.httpClient.put<any>(`/Comment/Update/${id}`, comment);
  }

  deleteComment(id: number) {
    return this.httpClient.delete<any>(`/Comment/Delete/${id}`);
  }

  getCommentByContentId(id: number) {
    return this.httpClient.get<any>(`/Comment/GetByContent/${id}`);
  }
}
