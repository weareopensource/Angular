import { Store } from '@ngrx/store';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { _throw } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators/catchError';
import {
  fromAuthentication,
  getTokenExpiresIn,
  AuthenticationState } from '@labdat/authentication-state';

@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {

  private tokenExpiresIn$;

  constructor(private store: Store<AuthenticationState>) {
    this.tokenExpiresIn$ = this.store.select(getTokenExpiresIn);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (request.url.match(/(?!\api\/)/)) {
      const nextRequest = request.clone({ withCredentials: true });
      return next.handle(nextRequest);
    }

    return this.tokenExpiresIn$
    .first()
    .switchMap(tokenExpiresIn => {
      if (tokenExpiresIn && tokenExpiresIn < Date.now()) {
        this.store.dispatch(new fromAuthentication.Logout('Token Expired'));
        return empty();
      }
      return next
      .handle(request).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 403 && !error.url.includes('/auth')) {
            this.store.dispatch(new fromAuthentication.Logout('Unauthorized Operation'));
            return empty();
          }
          return _throw(error);
        })
      );
    });
  }
}
