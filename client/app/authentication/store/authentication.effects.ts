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
// import { Database } from '@ngrx/db';
import { MatSnackBar } from '@angular/material';
import { LoginSnackComponent } from '../components/login-snack';

@Injectable()
export class AuthenticationEffects {
/*
  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
//    return this.db.open('app');
  });
*/
  @Effect()
  login$ = this.actions$
    .ofType(fromAuth.LOGIN)
    .map(toPayload)
    .exhaustMap(auth => this.authenticationService.login(auth))
    .catch(error => of(new fromAuth.LoginFailure(error)))
    .do((payload: any) => sessionStorage.setItem('user', JSON.stringify(payload.user)))
    .do((payload: any) => sessionStorage.setItem('tokenExpiresIn', payload.tokenExpiresIn))
//    .mergeMap((payload: any) => this.db
//      .executeWrite('auth', 'add', [ payload ])
      .map((payload) => new fromAuth.LoginSuccess({ user: payload.user }));
//    );

  @Effect()
  logout$ = this.actions$
    .ofType(fromAuth.LOGOUT)
    .do(() => sessionStorage.removeItem('user'))
    .do(() => sessionStorage.removeItem('tokenExpiresIn'))
//    .mergeMap(() => this.db.query('auth', (user) => user).first())
//    .mergeMap((user) => this.db.executeWrite('auth', 'delete', [ user.id ]))
    .mapTo(new fromRouter.Go({path: ['/', 'auth']}))

  @Effect()
  loginSuccess$ = this.actions$
    .ofType(fromAuth.LOGIN_SUCCESS)
    .do(() => this.snackBar.openFromComponent(LoginSnackComponent, {
      duration: 500,
    }))
    .mapTo(new fromRouter.Go({path: ['/', 'test2']}));

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationApi,
    private router: Router,
    // private db: Database
    private snackBar: MatSnackBar
  ) {}
}
