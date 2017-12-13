import { Injectable, Inject } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { User, Authenticate } from 'app/authentication';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class AuthenticationApiService {

  constructor(private http: HttpClient) { }

  login({ email, password }: Authenticate) {
    return this.http
    .post(`${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}/${environment.backend.endpoints.base}/${environment.backend.endpoints.signin}`, { usernameOrEmail: email, password }, { withCredentials: true });
  }

  register(registration: any) {
    return this.http
    .post(`${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}/${environment.backend.endpoints.base}/${environment.backend.endpoints.signup}`, registration);
    //      .do(token => this.setAuthorizationHeader(token));
  }
}
