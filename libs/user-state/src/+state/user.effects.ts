import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';
import { mapTo } from 'rxjs/operators/mapTo';
import { tap } from 'rxjs/operators/tap';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators/switchMap';
import { of } from 'rxjs/observable/of';
import { UserApiService } from '../services/user.api.service';
import * as fromUsers from './user.actions';
import { fromAuthentication } from '@labdat/authentication-state';
import { User } from '@labdat/data-models';
import { UserSnackComponent } from '../components/user-snack/user-snack.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UserEffects {
  @Effect()
  loginSuccess$ = this._actions$.ofType(fromAuthentication.LOGIN_SUCCESS)
  .pipe(mapTo(new fromUsers.Load()));

  @Effect()
  registerSuccess$ = this._actions$.ofType(fromAuthentication.REGISTER_SUCCESS)
  .pipe(mapTo(new fromUsers.Load()));

  @Effect()
  load$ = this._actions$
    .ofType(fromUsers.LOAD)
    .pipe(
      switchMap(() => this._userApiService.loadUsers()),
      map((response: any) => new fromUsers.LoadSuccess({ users: response })),
      catchError(error => of(new fromUsers.LoadFailure(error)))
    );

    @Effect({ dispatch: false })
    loadFailure$ = this._actions$.ofType(fromUsers.LOAD_FAILURE)
    .pipe(
      map(toPayload),
      tap(() =>
        this.snackBar.openFromComponent(UserSnackComponent, {
          duration: 1000,
          data: 'User Load Failure',
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      )
    );

  @Effect()
  add$ = this._actions$
    .ofType(fromUsers.ADD)
    .pipe(
      map(toPayload),
      switchMap(payload => this._userApiService.addUser(payload.user)),
      map((user: User) => new fromUsers.AddSuccess({ user })),
      catchError(error => of(new fromUsers.AddFailure({ error })))
    );

    @Effect({dispatch: false})
    addSuccess$ = this._actions$.ofType(fromUsers.ADD_SUCCESS)
    .pipe(
      tap(() => {
        this.snackBar.openFromComponent(UserSnackComponent, {
          duration: 1000,
          data: 'User Created',
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      })
    );

    @Effect({ dispatch: false })
    addFailure$ = this._actions$.ofType(fromUsers.ADD_FAILURE)
    .pipe(
      map(toPayload),
      tap(() =>
        this.snackBar.openFromComponent(UserSnackComponent, {
          duration: 1000,
          data: 'User Creation Failure',
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      )
    );

  @Effect()
  update$ = this._actions$
    .ofType(fromUsers.UPDATE)
    .pipe(
      map(toPayload),
      switchMap(payload => this._userApiService.updateUser(payload.user)),
      map((response: any) => new fromUsers.UpdateSuccess({ user: { id: response.id, changes: { ...response } } })),
      catchError(error => of(new fromUsers.UpdateFailure(error)))
    );

    @Effect({dispatch: false})
    updateSuccess$ = this._actions$.ofType(fromUsers.UPDATE_SUCCESS)
    .pipe(
      tap(() => {
        this.snackBar.openFromComponent(UserSnackComponent, {
          duration: 1000,
          data: 'User Updated',
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      })
    );

    @Effect({ dispatch: false })
    updateFailure$ = this._actions$.ofType(fromUsers.UPDATE_FAILURE)
    .pipe(
      map(toPayload),
      tap(() =>
        this.snackBar.openFromComponent(UserSnackComponent, {
          duration: 1000,
          data: 'User Update Failure',
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      )
    );

  @Effect()
  delete$ = this._actions$
    .ofType(fromUsers.DELETE)
    .pipe(
      map(toPayload),
      switchMap(payload => this._userApiService.deleteUser(payload.userId)),
      map((response: any) => new fromUsers.DeleteSuccess(response)),
      catchError(error => of(new fromUsers.DeleteFailure(error)))
    );

    @Effect({dispatch: false})
    deleteSuccess$ = this._actions$.ofType(fromUsers.DELETE_SUCCESS)
    .pipe(
      tap(() => {
        this.snackBar.openFromComponent(UserSnackComponent, {
          duration: 1000,
          data: 'User Deleted',
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      })
    );

    @Effect({ dispatch: false })
    deleteFailure$ = this._actions$.ofType(fromUsers.DELETE_FAILURE)
    .pipe(
      map(toPayload),
      tap(() =>
        this.snackBar.openFromComponent(UserSnackComponent, {
          duration: 1000,
          data: 'User Deletion Failure',
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      )
    );

  @Effect({ dispatch: false })
  saveDescription$ = this._actions$
    .ofType(fromUsers.SAVE_DESCRIPTION)
    .pipe(
      map(toPayload), tap(payload => sessionStorage.setItem(`user${payload.userId}Desciption`, payload.text))
    );

  constructor(private _actions$: Actions, private _userApiService: UserApiService, private snackBar: MatSnackBar) { }
}
