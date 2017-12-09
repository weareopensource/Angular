import { Store } from '@ngrx/store';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { _throw } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators/catchError';
import * as AuthenticationActions from '../store/authentication.actions';
import { AuthenticationState } from '../store/authentication.interfaces';
import { AuthenticationSelectorsService } from '../store/authentication.selectors.service';
import { isEmpty } from 'lodash';

@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {

  private urlFilters = ['/api'];
  private tokenExpiresIn$;

  constructor(private store: Store<AuthenticationState>, private authenticationSelectorsService: AuthenticationSelectorsService) {
    this.tokenExpiresIn$ = this.store.select(this.authenticationSelectorsService.getTokenExpiresIn)
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (request.url.match(/(?!\api\/)/)) {
      return next.handle(request);
    }

    return this.tokenExpiresIn$
    .first()
    .switchMap(tokenExpiresIn => {
      if (tokenExpiresIn && tokenExpiresIn < Date.now()) {
        this.store.dispatch(new AuthenticationActions.Logout('Token Expired'));
        return empty();
      }
      return next
      .handle(request).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 403 && !error.url.includes('/auth')) {
            this.store.dispatch(new AuthenticationActions.Logout('Unauthorized Operation'));
            return empty();
          }
          return _throw(error);            
        })
      )
    });
  }
}
