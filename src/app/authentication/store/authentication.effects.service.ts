import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material';
import { LoginSnackComponent } from '../components/login-snack/login-snack.component';
import { AuthenticationApiService } from '../services/authentication.api.service';
import * as AuthenticationActions from './authentication.actions';

import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { exhaustMap } from 'rxjs/operators/exhaustMap';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';


@Injectable()
export class AuthenticationEffectsService {

  @Effect()
  login$ = this.actions$
    .ofType(AuthenticationActions.LOGIN).pipe(
      map(toPayload),
      exhaustMap(auth => this.authenticationApiService.login(auth)
        .pipe(
          catchError(error => {
          this.store.dispatch(new AuthenticationActions.LoginFailure('Email or Password Invalid'));
          return empty();
        }))),
      tap((payload: any) => {
        sessionStorage.setItem('user', JSON.stringify(payload.user));
        sessionStorage.setItem('tokenExpiresIn', payload.tokenExpiresIn);
      }),
      map((payload) => new AuthenticationActions.LoginSuccess({ user: payload.user, tokenExpiresIn: payload.tokenExpiresIn }))
    );

  @Effect({ dispatch: false })
  logout$ = this.actions$
    .ofType(AuthenticationActions.LOGOUT).pipe(
      map(toPayload),
      tap((message) => {
        sessionStorage.removeItem('tokenExpiresIn');      
        sessionStorage.removeItem('user');
        this.snackBar.openFromComponent(LoginSnackComponent, {
          duration: 1000,
          data: message || 'Logout',
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        this.router.navigate(['/', 'auth']);
      })
    );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
    .ofType(AuthenticationActions.LOGIN_SUCCESS).pipe(
      tap(() => {
        this.snackBar.openFromComponent(LoginSnackComponent, {
          duration: 1000,
          data: 'Login Success',
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        this.router.navigate(['/', 'test2']);
      })
    );

  @Effect({ dispatch: false })
  loginFailure$ = this.actions$
    .ofType(AuthenticationActions.LOGIN_FAILURE).pipe(
      map(toPayload),
      tap((message) => this.snackBar.openFromComponent(LoginSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }))
    );

  constructor(
    private actions$: Actions,
    private authenticationApiService: AuthenticationApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store<any>) { }
}
