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
import * as fromAuth from '../store';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  private urlFilters = ['/api'];

  constructor(private store: Store<fromAuth.State>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (request.url.match(/\assets\//)) {
      return next.handle(request);
    }
    if (parseInt(sessionStorage.getItem('tokenExpiresIn'), 10) < Date.now()) {
      this.store.dispatch(new fromAuth.Logout());
      return Observable.throw('Token expired');
    }
    return next
    .handle(request)
    .catch(error => {
      if (error instanceof HttpErrorResponse && error.status === 403 && !error.url.includes('/auth')) {
        this.store.dispatch(new fromAuth.Logout());
      }
      return Observable.throw('Email or Password Invalid');
    });
  }
}
