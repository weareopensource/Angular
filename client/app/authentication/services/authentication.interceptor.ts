import { Store } from '@ngrx/store';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as action from '../store/authentication.actions';
import * as fromAuth from '../store/reducers';
import 'rxjs/add/observable/empty';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private router: Router, private store: Store<fromAuth.State>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (parseInt(sessionStorage.getItem('tokenExpiresIn'), 10) < Date.now()) {
      this.store.dispatch(new action.Logout());
      return Observable.empty();
    }

    return next
    .handle(request)
    .do(event => {
      if (event instanceof HttpResponse) {
        const body = event.body;
        sessionStorage.setItem('tokenExpiresIn', body.tokenExpiresIn);
        sessionStorage.setItem('user', JSON.stringify(body.user));
      }
    })
    .catch(error => {
      console.log(error);
      if (error instanceof HttpErrorResponse) {
        if (error.status === 403) {
          this.store.dispatch(new action.Logout());
        }
        return Observable.throw(error);
      }
    });
  }
}
