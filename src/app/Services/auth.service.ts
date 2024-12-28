import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { HttpClientService } from './httpclient.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private httpClient: HttpClientService) {
    this.checkToken();
  }

  login(email: string, password: string) {
    return this.httpClient
      .post<{ token: string }>('/auth/login', {
        email: email,
        password: password,
      })
      .pipe(
        tap((response) => {
          this.setToken(response.token);
        }),
        catchError((error) => {
          console.error('Login Error:', error);
          throw error;
        })
      );
  }

  activateInstructorRole(id: string) {
    return this.httpClient
      .post<{ token: string }>('/user/activate-role', { id })
      .pipe(
        tap((response) => {
          this.setToken(response.token);
        }),
        catchError((error) => {
          console.error('Activate Role Error:', error);
          throw error;
        })
      );
  }

  private setToken(token: string) {
    const decoded: any = jwtDecode(token);
    this.userSubject.next(decoded);
    localStorage.setItem(this.tokenKey, token);
    if (decoded.exp) {
      const expiresAt = new Date(decoded.exp * 1000).toISOString();
    }
  }

  public checkToken() {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userSubject.next(decoded);
    } else {
      this.userSubject.next(null);
    }
  }

  resetToken() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }
}
