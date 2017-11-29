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
import * as fromAuth from './authentication.actions';
import * as fromRouter from 'app/store/router';
import { MatSnackBar } from '@angular/material';
import { LoginSnackComponent } from '../components/login-snack';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthenticationEffects {

  @Effect()
  login$ = this.actions$
    .ofType(fromAuth.LOGIN)
    .map(toPayload)
    .exhaustMap(auth => this.authenticationService
      .login(auth)
      .catch(error => {
        this.store.dispatch(new fromAuth.LoginFailure('Email or Password Invalid'));
        return Observable.empty();
      }))
    .do((payload: any) => {
      sessionStorage.setItem('user', JSON.stringify(payload.user));
      sessionStorage.setItem('tokenExpiresIn', payload.tokenExpiresIn);
    })
    .map((payload) => new fromAuth.LoginSuccess({ user: payload.user }))

  @Effect()
  logout$ = this.actions$
    .ofType(fromAuth.LOGOUT)
    .map(toPayload)
    .do((message) => {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('tokenExpiresIn');
      this.snackBar.openFromComponent(LoginSnackComponent, {
        duration: 1000,
        data: message || 'Logout'
      })
    })
    .mapTo(new fromRouter.Go({path: ['/', 'auth']}))

  @Effect()
  loginSuccess$ = this.actions$
    .ofType(fromAuth.LOGIN_SUCCESS)
    .do(() => this.snackBar.openFromComponent(LoginSnackComponent, {
      duration: 1000,
      data: 'Login Success',
      horizontalPosition: 'right',
      verticalPosition: 'top'
    }))
    .mapTo(new fromRouter.Go({path: ['/', 'test2']}));

    @Effect({ dispatch: false })
    loginFailure$ = this.actions$
      .ofType(fromAuth.LOGIN_FAILURE)
      .map(toPayload)
      .do((message) => this.snackBar.openFromComponent(LoginSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }));

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationApi,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store<any>
  ) {}
}
