import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private readonly baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  private getHeaders(
    contentType: string = 'application/json',
    boundary?: string
  ): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    const headers: any = {
      Authorization: `Bearer ${token}`,
    };

    if (contentType === 'multipart/form-data' && boundary) {
      headers['Content-Type'] = `${contentType}; boundary=${boundary}`;
    } else if (contentType !== 'multipart/form-data') {
      headers['Content-Type'] = contentType;
    }

    return new HttpHeaders(headers);
  }

  get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${endpoint}`, {
      headers: this.getHeaders(),
      params,
    });
  }

  post<T>(
    endpoint: string,
    body: any,
    isFormData: boolean = false
  ): Observable<T> {
    const headers = isFormData
      ? this.getHeaders('multipart/form-data')
      : this.getHeaders();
    return this.http.post<T>(`${this.baseURL}${endpoint}`, body, {
      headers,
    });
  }

  put<T>(
    endpoint: string,
    body: any,
    isFormData: boolean = false
  ): Observable<T> {
    const headers = isFormData
      ? this.getHeaders('multipart/form-data')
      : this.getHeaders();

    return this.http.put<T>(`${this.baseURL}${endpoint}`, body, {
      headers,
    });
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseURL}${endpoint}`, {
      headers: this.getHeaders(),
    });
  }
}
