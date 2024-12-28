import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';
import { CommentLike } from '../../entities/CommentLike';

@Injectable({
  providedIn: 'root',
})
export class CommentLikeService {
  constructor(private httpClient: HttpClientService) {}

  createCommentLike(commentLike: any) {
    return this.httpClient.post<any>('/CommentLike/Create', commentLike);
  }

  deleteCommentLike(id: number) {
    return this.httpClient.delete<any>(`/CommentLike/Delete/${id}`);
  }
}
