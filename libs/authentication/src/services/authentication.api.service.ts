import { Injectable } from '@angular/core';
import { Authenticate } from '../models/authenticate.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@labdat/common/environments';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationApiService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    const { protocol, host, port, endpoints } = environment.backend;
    this.baseUrl = `${protocol}://${host}:${port}/${endpoints.basePath}`;
  }

  login({ email, password }: Authenticate): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/auth/signin`,
      { usernameOrEmail: email, password },
      { withCredentials: true }
    );
  }

  register(registration: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, registration);
    //      .do(token => this.setAuthorizationHeader(token));
  }

  loadUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/me`);
    //      .do(token => this.setAuthorizationHeader(token));
  }

  updateUser(user): Observable<any> {
    return this.http.put(`${this.baseUrl}/users`, user);
    //      .do(token => this.setAuthorizationHeader(token));
  }

  changePassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/forgot`, { email });
    //      .do(token => this.setAuthorizationHeader(token));
  }

  resetPassword(newPassword: string, token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/reset`, { newPassword, token });
    //      .do(token => this.setAuthorizationHeader(token));
  }

}
