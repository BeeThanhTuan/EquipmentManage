import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private REST_API_SERVER = 'http://localhost:3000';
  private readonly TOKEN_KEY = 'ntt-secret-key';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  login(credentials: {email: string; password: string;}): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/login`;
    return this.httpClient.post<any>(url, credentials, this.httpOptions);
  }

  getInfoUser(id: string):Observable<any>{
    const url = `${this.REST_API_SERVER}/api/account/${id}`;
    return this.httpClient.get<any>(url);
  }

  updateName(userInfo: {email: string; name: string;}): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/account/updateName`;
    return this.httpClient.put<any>(url, userInfo, this.httpOptions);
  }

  getTokenCookie(): string | null {
    return this.cookieService.get(this.TOKEN_KEY);
  }

  setTokenCookie(token: string): void {
    const now = new Date();
    const expireTime = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now
    this.cookieService.set(this.TOKEN_KEY, token, { expires: expireTime, path: '/' });
  }

  removeTokenCookie(): void {
    this.cookieService.delete(this.TOKEN_KEY, '/');
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getIdFromToken(): string | null {
    const token = this.getTokenCookie();
    if (token) {
      const decoded = this.decodeToken(token);
      return decoded ? decoded.id : null;
    }
    return null;
  }
}
