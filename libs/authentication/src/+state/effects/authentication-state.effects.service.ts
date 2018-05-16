import { fromRouter } from '@labdat/common/router-state';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material';
import { AuthenticationSnackComponent } from '../../components/authentication-snack/authentication-snack.component';
import { LocalAuthenticationService } from '../../services/local-authentication.service';
import * as fromAuthentication from '../actions/authentication-state.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators/map';
import { mapTo } from 'rxjs/operators/mapTo';
import { tap } from 'rxjs/operators/tap';
import { exhaustMap } from 'rxjs/operators/exhaustMap';
import { catchError } from 'rxjs/operators/catchError';
import { empty } from 'rxjs/observable/empty';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
// import { environment } from '@labdat/common/environments';

@Injectable()
export class AuthenticationEffectsService {
  @Effect()
  localLogin$ = this._actions$.ofType(fromAuthentication.LOCAL_LOGIN)
  .pipe(
    map((action: fromAuthentication.LocalLogin) => action.payload),
    exhaustMap(auth =>
      this._localAuthenticationService.login(auth)
      .pipe(
        catchError((error: any) => {
          console.log(error);
          this._store.dispatch(new fromAuthentication.LocalLoginFailure('Email or Password Invalid'));

          return empty();
        })
      )
    ),
    tap((payload: any) => {
      localStorage.setItem('tokenExpiresIn', payload.tokenExpiresIn);
    }),
    map(payload => new fromAuthentication.LocalLoginSuccess({ user: payload.user, tokenExpiresIn: payload.tokenExpiresIn }))
  );

  @Effect()
  localLoginSuccess$ = this._actions$.ofType(fromAuthentication.LOCAL_LOGIN_SUCCESS)
  .pipe(
    tap(() => {
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'Login Success',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['tasks'] }))
  );

  @Effect({ dispatch: false })
  localLoginFailure$ = this._actions$.ofType(fromAuthentication.LOCAL_LOGIN_FAILURE)
  .pipe(
    map((action: fromAuthentication.LocalLoginFailure) => action.payload),
    tap(message =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  @Effect()
  logout$ = this._actions$.ofType(fromAuthentication.LOGOUT)
  .pipe(
    map((action: fromAuthentication.Logout) => action.payload),
    tap((message: any) => {
      localStorage.removeItem('tokenExpiresIn');
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message || 'Logout',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['auth'] }))
  );

  @Effect()
  googleLogin$ = this._actions$.ofType(fromAuthentication.GOOGLE_LOGIN)
  .pipe(
    exhaustMap(() =>
      this._localAuthenticationService.login({ email: '', password: '' })
      .pipe(
        catchError((error: any) => {
          console.log(error);
          this._store.dispatch(new fromAuthentication.GoogleLoginFailure('Email or Password Invalid'));

          return empty();
        })
      )
    ),
    tap((payload: any) => {
      localStorage.setItem('tokenExpiresIn', payload.tokenExpiresIn);
    }),
    map(payload => new fromAuthentication.GoogleLoginSuccess({ user: payload.user, tokenExpiresIn: payload.tokenExpiresIn }))
  );

  @Effect()
  googleLoginSuccess$ = this._actions$.ofType(fromAuthentication.GOOGLE_LOGIN_SUCCESS)
  .pipe(
    tap(() => {
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'Login Success',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['tasks'] }))
  );

  @Effect({ dispatch: false })
  googleLoginFailure$ = this._actions$.ofType(fromAuthentication.GOOGLE_LOGIN_FAILURE)
  .pipe(
    map((action: fromAuthentication.GoogleLoginFailure) => action.payload),
    tap(message =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  @Effect()
  facebookLogin$ = this._actions$.ofType(fromAuthentication.FACEBOOK_LOGIN)
  .pipe(
    exhaustMap(() =>
    this._localAuthenticationService.login({ email: '', password: '' })
    .pipe(
        catchError((error: any) => {
          console.log(error);
          this._store.dispatch(new fromAuthentication.FacebookLoginFailure('Email or Password Invalid'));

          return empty();
        })
      )
    ),
    tap((payload: any) => {
      localStorage.setItem('tokenExpiresIn', payload.tokenExpiresIn);
    }),
    map(payload => new fromAuthentication.FacebookLoginSuccess({ user: payload.user, tokenExpiresIn: payload.tokenExpiresIn }))
  );

  @Effect()
  facebookLoginSuccess$ = this._actions$.ofType(fromAuthentication.FACEBOOK_LOGIN_SUCCESS)
  .pipe(
    tap(() => {
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'Login Success',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['tasks'] }))
  );

  @Effect({ dispatch: false })
  facebookLoginFailure$ = this._actions$.ofType(fromAuthentication.FACEBOOK_LOGIN_FAILURE)
  .pipe(
    map((action: fromAuthentication.FacebookLoginFailure) => action.payload),
    tap(message =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  @Effect()
  twitterLogin$ = this._actions$.ofType(fromAuthentication.TWITTER_LOGIN)
  .pipe(
    exhaustMap(() =>
      this._localAuthenticationService.login({ email: '', password: '' })
      .pipe(
        catchError((error: any) => {
          console.log(error);
          this._store.dispatch(new fromAuthentication.TwitterLoginFailure('Email or Password Invalid'));

          return empty();
        })
      )
    ),
    tap((payload: any) => {
      localStorage.setItem('tokenExpiresIn', payload.tokenExpiresIn);
    }),
    map(payload => new fromAuthentication.TwitterLoginSuccess({ user: payload.user, tokenExpiresIn: payload.tokenExpiresIn }))
  );

  @Effect()
  twitterLoginSuccess$ = this._actions$.ofType(fromAuthentication.TWITTER_LOGIN_SUCCESS)
  .pipe(
    tap(() => {
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'Login Success',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['tasks'] }))
  );

  @Effect({ dispatch: false })
  twitterLoginFailure$ = this._actions$.ofType(fromAuthentication.TWITTER_LOGIN_FAILURE)
  .pipe(
    map((action: fromAuthentication.TwitterLoginFailure) => action.payload),
    tap(message =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  @Effect()
  githubLogin$ = this._actions$.ofType(fromAuthentication.GITHUB_LOGIN)
  .pipe(
    exhaustMap(() =>
      this._localAuthenticationService.login({ email: '', password: '' })
      .pipe(
        catchError((error: any) => {
          console.log(error);
          this._store.dispatch(new fromAuthentication.GithubLoginFailure('Email or Password Invalid'));

          return empty();
        })
      )
    ),
    tap((payload: any) => {
      localStorage.setItem('tokenExpiresIn', payload.tokenExpiresIn);
    }),
    map(payload => new fromAuthentication.GithubLoginSuccess({ user: payload.user, tokenExpiresIn: payload.tokenExpiresIn }))
  );

  @Effect()
  githubLoginSuccess$ = this._actions$.ofType(fromAuthentication.GITHUB_LOGIN_SUCCESS)
  .pipe(
    tap(() => {
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'Login Success',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['tasks'] }))
  );

  @Effect({ dispatch: false })
  githubLoginFailure$ = this._actions$.ofType(fromAuthentication.GITHUB_LOGIN_FAILURE)
  .pipe(
    map((action: fromAuthentication.GithubLoginFailure) => action.payload),
    tap(message =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  @Effect()
  register$ = this._actions$.ofType(fromAuthentication.REGISTER)
  .pipe(
    map((action: fromAuthentication.RegisterFailure) => action.payload),
    exhaustMap(auth =>
      this._localAuthenticationService
        .register({
          ...auth,
          username: auth.firstName + auth.lastName
        })
        .pipe(
          catchError((error: any) => {
            console.log(error);
            this._store.dispatch(new fromAuthentication.RegisterFailure('Register Error'));

            return empty();
          })
        )
    ),
    tap((payload: any) => {
      localStorage.setItem('tokenExpiresIn', payload.tokenExpiresIn);
    }),
    map(payload => new fromAuthentication.RegisterSuccess({ ...payload }))
  );

  @Effect()
  registerSuccess$ = this._actions$.ofType(fromAuthentication.REGISTER_SUCCESS)
  .pipe(
    tap(() => {
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'Register Success',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['tasks'] }))
  );

  @Effect({ dispatch: false })
  registerFailure$ = this._actions$.ofType(fromAuthentication.REGISTER_FAILURE)
  .pipe(
    map((action: fromAuthentication.RegisterFailure) => action.payload),
    tap(message =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  @Effect()
  updateUser$ = this._actions$.ofType(fromAuthentication.UPDATE_USER)
  .pipe(
    map((action: fromAuthentication.UpdateUser) => action.payload),
    exhaustMap(payload =>
      this._localAuthenticationService
        .updateUser(payload.user)
        .pipe(
          catchError((error: any) => {
            console.log(error);
            this._store.dispatch(new fromAuthentication.UserUpdateFailure('User Update Error'));

            return empty();
          })
        )
    ),
    map(payload => new fromAuthentication.UserUpdateSuccess({ user: payload }))
  );

  @Effect({ dispatch: false })
  UserUpdateSuccess$ = this._actions$.ofType(fromAuthentication.USER_UPDATE_SUCCESS)
  .pipe(
    tap(() => {
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'User Update Success',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    })
  );

  @Effect({ dispatch: false })
  UserUpdateFailure$ = this._actions$.ofType(fromAuthentication.USER_UPDATE_FAILURE)
  .pipe(
    map((action: fromAuthentication.UserUpdateFailure) => action.payload),
    tap(message =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  @Effect()
  loadUser$ = this._actions$.ofType(fromAuthentication.LOAD_USER)
  .pipe(
    map((action: any) => action.payload),
    exhaustMap((provider: string) => {
      switch (provider) {
        case 'google':
          const google = JSON.parse(localStorage.getItem('google'));
          const userinfoEndpoint = google.userinfo_endpoint;
          const accessToken = JSON.parse(localStorage.getItem('ng2-ui-auth.token')).access_token;

          return this._http.get(userinfoEndpoint, {
            headers: {
              authorization: `Bearer ${accessToken}`
            }
          })
          .pipe(map((response: any) => {
            const { email, family_name, given_name, picture, sub } = response;

            return new fromAuthentication.UserLoadSuccess({
              user: {
                email,
                id: sub,
                firstName: given_name,
                lastName: family_name,
                profileImageURL: picture
              } as User
            });
          }));
        default:
          return this._localAuthenticationService
          .loadUser()
          .pipe(
            catchError((error: any) => {
              console.log(error);
              this._store.dispatch(new fromAuthentication.UserLoadFailure('User Load Error'));

              return empty();
            })
          );
      }
    })
//    map(payload => new fromAuthentication.UserLoadSuccess({ user: payload }))
  );

  @Effect({ dispatch: false })
userLoadFailure$ = this._actions$.ofType(fromAuthentication.USER_LOAD_FAILURE)
  .pipe(
    map((action: fromAuthentication.UserLoadFailure) => action.payload),
    tap(message =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  @Effect()
changePassword$ = this._actions$.ofType(fromAuthentication.CHANGE_PASSWORD)
  .pipe(
    map((action: fromAuthentication.ChangePassword) => action.payload),
    exhaustMap(payload =>
      this._localAuthenticationService
        .changePassword(payload.email)
        .pipe(
          catchError((error: any) => {
            console.log(error);
            this._store.dispatch(new fromAuthentication.ChangePasswordFailure(error.error.message));

            return empty();
          })
        )
    ),
    map(response => new fromAuthentication.ChangePasswordSuccess(response.message))
  );

  @Effect({ dispatch: false })
changePassordSuccess$ = this._actions$.ofType(fromAuthentication.CHANGE_PASSWORD_SUCCESS)
  .pipe(
    map((action: fromAuthentication.ChangePasswordSuccess) => action.payload),
    tap(() =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'An email has been sent to the provided email with further instructions',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  @Effect({ dispatch: false })
changePassordFailure$ = this._actions$.ofType(fromAuthentication.CHANGE_PASSWORD_FAILURE)
  .pipe(
    map((action: fromAuthentication.ChangePasswordFailure) => action.payload),
    tap(message =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  @Effect()
resetPassword$ = this._actions$.ofType(fromAuthentication.RESET_PASSWORD)
  .pipe(
    map((action: fromAuthentication.ResetPassword) => action.payload),
    exhaustMap(payload =>
      this._localAuthenticationService
        .resetPassword(payload.newPassword, payload.token)
        .pipe(
          catchError((error: any) => {
            console.log(error);
            this._store.dispatch(new fromAuthentication.ResetPasswordFailure(error.error.message));

            return empty();
          })
        )
    ),
    map(response => new fromAuthentication.ResetPasswordSuccess(response.message))
  );

  @Effect({ dispatch: false })
resetPassordSuccess$ = this._actions$.ofType(fromAuthentication.RESET_PASSWORD_SUCCESS)
  .pipe(
    map((action: fromAuthentication.ResetPasswordSuccess) => action.payload),
    tap(() =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'Password Reseted',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    ),
    tap(() => this._store.dispatch(new fromRouter.Go({ path: ['auth'] })))
  );

  @Effect({ dispatch: false })
resetPassordFailure$ = this._actions$.ofType(fromAuthentication.CHANGE_PASSWORD_FAILURE)
  .pipe(
    map((action: fromAuthentication.ResetPasswordFailure) => action.payload),
    tap(message =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  constructor(
    private _actions$: Actions,
    private _localAuthenticationService: LocalAuthenticationService,
    private _snackBar: MatSnackBar,
    private _http: HttpClient,
    private _store: Store<any>
  ) { }
}
