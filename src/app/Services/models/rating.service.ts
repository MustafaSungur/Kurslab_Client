import { Injectable } from '@angular/core';
import { Rating } from '../../entities/Rating';
import { HttpClientService } from '../httpclient.service';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private httpClient: HttpClientService) {}

  createRating(rating: any) {
    return this.httpClient.post<any>('/Rating/Create', rating);
  }
}
