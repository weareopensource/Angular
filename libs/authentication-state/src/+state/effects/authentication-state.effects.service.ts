import { fromRouter } from '@labdat/router-state';
import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material';
import { LoginSnackComponent } from '../../components/login-snack/login-snack.component';
import { AuthenticationApiService } from '../../services/authentication.api.service';
import * as fromAuthentication from '../actions/authentication-state.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators/map';
import { mapTo } from 'rxjs/operators/mapTo';
import { tap } from 'rxjs/operators/tap';
import { exhaustMap } from 'rxjs/operators/exhaustMap';
import { catchError } from 'rxjs/operators/catchError';
import { empty } from 'rxjs/observable/empty';

@Injectable()
export class AuthenticationEffectsService {
  @Effect()
  login$ = this.actions$.ofType(fromAuthentication.LOGIN)
  .pipe(
    map(toPayload),
    exhaustMap(auth =>
      this.authenticationApiService.login(auth)
      .pipe(
        catchError(error => {
          console.log(error);
          this.store.dispatch(new fromAuthentication.LoginFailure('Email or Password Invalid'));

          return empty();
        })
      )
    ),
    tap((payload: any) => {
      sessionStorage.setItem('tokenExpiresIn', payload.tokenExpiresIn);
    }),
    map(payload => new fromAuthentication.LoginSuccess({ user: payload.user, tokenExpiresIn: payload.tokenExpiresIn }))
  );

  @Effect()
  logout$ = this.actions$.ofType(fromAuthentication.LOGOUT)
  .pipe(
    map(toPayload),
    tap(message => {
      sessionStorage.removeItem('tokenExpiresIn');
      this.snackBar.openFromComponent(LoginSnackComponent, {
        duration: 1000,
        data: message || 'Logout',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['auth'] }))
  );

  @Effect()
  loginSuccess$ = this.actions$.ofType(fromAuthentication.LOGIN_SUCCESS)
  .pipe(
    tap(() => {
      this.snackBar.openFromComponent(LoginSnackComponent, {
        duration: 1000,
        data: 'Login Success',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['tasks'] }))
  );

  @Effect({ dispatch: false })
  loginFailure$ = this.actions$.ofType(fromAuthentication.LOGIN_FAILURE)
  .pipe(
    map(toPayload),
    tap(message =>
      this.snackBar.openFromComponent(LoginSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  @Effect()
  register$ = this.actions$.ofType(fromAuthentication.REGISTER)
  .pipe(
    map(toPayload),
    exhaustMap(auth =>
      this.authenticationApiService
        .register({
          ...auth,
          username: auth.firstName + auth.lastName
        })
        .pipe(
          catchError(error => {
            console.log(error);
            this.store.dispatch(new fromAuthentication.RegisterFailure('Register Error'));

            return empty();
          })
        )
    ),
    tap((payload: any) => {
      sessionStorage.setItem('tokenExpiresIn', payload.tokenExpiresIn);
    }),
    map(payload => new fromAuthentication.RegisterSuccess({ ...payload }))
  );

  @Effect()
  registerSuccess$ = this.actions$.ofType(fromAuthentication.REGISTER_SUCCESS)
  .pipe(
    tap(() => {
      this.snackBar.openFromComponent(LoginSnackComponent, {
        duration: 1000,
        data: 'Register Success',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['tasks'] }))
  );

  @Effect({ dispatch: false })
  registerFailure$ = this.actions$.ofType(fromAuthentication.REGISTER_FAILURE)
  .pipe(
    map(toPayload),
    tap(message =>
      this.snackBar.openFromComponent(LoginSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  @Effect()
  updateUser$ = this.actions$.ofType(fromAuthentication.UPDATE_USER)
  .pipe(
    map(toPayload),
    exhaustMap(payload =>
      this.authenticationApiService
        .updateUser(payload.user)
        .pipe(
          catchError(error => {
            console.log(error);
            this.store.dispatch(new fromAuthentication.UserUpdateFailure('Register Error'));

            return empty();
          })
        )
    ),
    map(payload => new fromAuthentication.UserUpdateSuccess({ user: payload }))
  );

  @Effect({dispatch: false})
  UserUpdateSuccess$ = this.actions$.ofType(fromAuthentication.USER_UPDATE_SUCCESS)
  .pipe(
    tap(() => {
      this.snackBar.openFromComponent(LoginSnackComponent, {
        duration: 1000,
        data: 'User Update Success',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    })
  );

  @Effect({ dispatch: false })
  UserUpdateFailure$ = this.actions$.ofType(fromAuthentication.USER_UPDATE_FAILURE)
  .pipe(
    map(toPayload),
    tap(message =>
      this.snackBar.openFromComponent(LoginSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  @Effect()
  loadUser$ = this.actions$.ofType(fromAuthentication.LOAD_USER)
  .pipe(
    exhaustMap(_payload =>
      this.authenticationApiService
        .loadUser()
        .pipe(
          catchError(error => {
            console.log(error);
            this.store.dispatch(new fromAuthentication.UserLoadFailure('User Load Error'));

            return empty();
          })
        )
    ),
    map(payload => new fromAuthentication.UserLoadSuccess({ user: payload }))
  );

  @Effect({ dispatch: false })
  userLoadFailure$ = this.actions$.ofType(fromAuthentication.USER_LOAD_FAILURE)
  .pipe(
    map(toPayload),
    tap(message =>
      this.snackBar.openFromComponent(LoginSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authenticationApiService: AuthenticationApiService,
    private snackBar: MatSnackBar,
    private store: Store<any>
  ) { }
}
