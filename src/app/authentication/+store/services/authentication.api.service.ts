import { Injectable, Inject } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { User, Authenticate } from 'app/authentication';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationApiService {

  private baseUrl = '/api';

  constructor(private http: HttpClient) { }

  login({ email, password }: Authenticate) {
    return this.http
    .post(`${this.baseUrl}/auth/login`, { email, password }, { withCredentials: true });
  }

/*
  register(name, email, password) {
    return this.http
    .post(`${this.baseUrl}/auth/register`, { name, email, password }, { responseType: 'text' });
//      .do(token => this.setAuthorizationHeader(token));
  }
*/
}
