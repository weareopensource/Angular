import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mergeMap';
import { defer } from 'rxjs/observable/defer';
import { toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/from';
import { AuthenticationApi } from '../services/authentication.api';
import * as AuthenticationActions from './authentication.actions';
import { MatSnackBar } from '@angular/material';
import { LoginSnackComponent } from '../components/login-snack';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthenticationEffects {

  @Effect()
  login$ = this.actions$
    .ofType(AuthenticationActions.LOGIN)
    .map(toPayload)
    .exhaustMap(auth => this.authenticationApi
      .login(auth)
      .catch(error => {
        this.store.dispatch(new AuthenticationActions.LoginFailure('Email or Password Invalid'));
        return Observable.empty();
      }))
    .do((payload: any) => {
      sessionStorage.setItem('user', JSON.stringify(payload.user));
      sessionStorage.setItem('tokenExpiresIn', payload.tokenExpiresIn);
    })
    .map((payload) => new AuthenticationActions.LoginSuccess({ user: payload.user }))

  @Effect({ dispatch: false })
  logout$ = this.actions$
    .ofType(AuthenticationActions.LOGOUT)
    .map(toPayload)
    .do((message) => {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('tokenExpiresIn');
      this.snackBar.openFromComponent(LoginSnackComponent, {
        duration: 1000,
        data: message || 'Logout',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      this.router.navigate(['/', 'auth']);
    })

  @Effect()
  loginSuccess$ = this.actions$
    .ofType(AuthenticationActions.LOGIN_SUCCESS)
    .do(() => this.snackBar.openFromComponent(LoginSnackComponent, {
      duration: 1000,
      data: 'Login Success',
      horizontalPosition: 'right',
      verticalPosition: 'top'
    }))
    .mapTo(this.router.navigate(['/', 'test2']));

    @Effect({ dispatch: false })
    loginFailure$ = this.actions$
      .ofType(AuthenticationActions.LOGIN_FAILURE)
      .map(toPayload)
      .do((message) => this.snackBar.openFromComponent(LoginSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }));

  constructor(
    private actions$: Actions,
    private authenticationApi: AuthenticationApi,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store<any>) { }
}
