import { Injectable, Inject } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { User, Authenticate } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationApi {

  private baseUrl = '/api';

  constructor(private http: HttpClient) { }

  login({ email, password }: Authenticate) {
    if (email !== 'a@a.com') {
      return _throw('Invalid username or password');
    }
    return this.http
    .post(`${this.baseUrl}/auth/login`, { email, password }, { withCredentials: true });
  }

  logout() {
    return of(true);
  }

/*
  register(name, email, password) {
    return this.http
    .post(`${this.baseUrl}/auth/register`, { name, email, password }, { responseType: 'text' });
//      .do(token => this.setAuthorizationHeader(token));
  }

  getAuthorizationHeader() {
    // return window.setCookie('token');
    return '5';
  }

  setAuthorizationHeader(token) {
    return localStorage.setItem('token', token);
  }
*/
}
