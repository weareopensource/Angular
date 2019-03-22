import { Injectable } from '@angular/core';
import { map, catchError, tap, switchMap, switchMapTo } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { UserApiService } from '../services/user.api.service';
import * as fromUser from './user.actions';
import { User } from '../models/user.model';
import { UserSnackComponent } from '../components/user-snack/user-snack.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UserEffects {

  @Effect()
  loadAll$ = this._actions$
    .pipe(ofType(fromUser.LOAD_ALL))
    .pipe(
      switchMapTo(this._userApiService.loadUsers()),
      map((response: any) => new fromUser.LoadAllSuccess({ users: response })),
      catchError(error => of(new fromUser.LoadAllFailure(error)))
    );

  @Effect({ dispatch: false })
  loadAllFailure$ = this._actions$
  .pipe(ofType(fromUser.LOAD_ALL_FAILURE))
  .pipe(
    map((action: fromUser.LoadAllFailure) => action.payload),
    tap(() =>
      this.snackBar.openFromComponent(UserSnackComponent, {
        duration: 1000,
        data: 'User Load Failure',
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      })
    )
  );

  @Effect()
  loadOne$ = this._actions$
    .pipe(ofType(fromUser.LOAD_ONE))
    .pipe(
      switchMap((action: any) => this._userApiService.loadUser(action.payload)),
      map((response: any) => new fromUser.LoadOneSuccess(response)),
      catchError(error => of(new fromUser.LoadOneFailure(error)))
    );

  @Effect({ dispatch: false })
  loadOneFailure$ = this._actions$
  .pipe(ofType(fromUser.LOAD_ONE_FAILURE))
  .pipe(
    map((action: fromUser.LoadOneFailure) => action.payload),
    tap(() =>
      this.snackBar.openFromComponent(UserSnackComponent, {
        duration: 1000,
        data: 'User Load Failure',
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      })
    )
  );

  @Effect()
  add$ = this._actions$
    .pipe(ofType(fromUser.ADD))
    .pipe(
      map((action: fromUser.Add) => action.payload),
      switchMap(payload => this._userApiService.addUser(payload.user)),
      map((user: User) => new fromUser.AddSuccess({ user })),
      catchError(error => of(new fromUser.AddFailure({ error })))
    );

  @Effect({ dispatch: false })
  addSuccess$ = this._actions$
  .pipe(ofType(fromUser.ADD_SUCCESS))
  .pipe(
    tap(() => {
      this.snackBar.openFromComponent(UserSnackComponent, {
        duration: 1000,
        data: 'User Created',
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    })
  );

  @Effect({ dispatch: false })
  addFailure$ = this._actions$
  .pipe(ofType(fromUser.ADD_FAILURE))
  .pipe(
    map((action: fromUser.AddFailure) => action.payload),
    tap(() =>
      this.snackBar.openFromComponent(UserSnackComponent, {
        duration: 1000,
        data: 'User Creation Failure',
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      })
    )
  );

  @Effect()
  update$ = this._actions$
    .pipe(ofType(fromUser.UPDATE))
    .pipe(
      map((action: fromUser.Update) => action.payload),
      switchMap(payload => this._userApiService.updateUser(payload.user)),
      map((response: any) => new fromUser.UpdateSuccess({ user: { id: response.id, changes: { ...response } } })),
      catchError(error => of(new fromUser.UpdateFailure(error)))
    );

  @Effect({ dispatch: false })
    updateSuccess$ = this._actions$
    .pipe(ofType(fromUser.UPDATE_SUCCESS))
    .pipe(
      tap(() => {
        this.snackBar.openFromComponent(UserSnackComponent, {
          duration: 1000,
          data: 'User Updated',
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
      })
    );

  @Effect({ dispatch: false })
    updateFailure$ = this._actions$
    .pipe(ofType(fromUser.UPDATE_FAILURE))
    .pipe(
      map((action: fromUser.UpdateFailure) => action.payload),
      tap(() =>
        this.snackBar.openFromComponent(UserSnackComponent, {
          duration: 1000,
          data: 'User Update Failure',
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        })
      )
    );

  @Effect()
  delete$ = this._actions$
    .pipe(ofType(fromUser.DELETE))
    .pipe(
      map((action: fromUser.Delete) => action.payload),
      switchMap(payload => this._userApiService.deleteUser(payload.userId)),
      map((response: any) => new fromUser.DeleteSuccess({ userId: response.userId })),
      catchError(error => of(new fromUser.DeleteFailure(error)))
    );

  @Effect({ dispatch: false })
    deleteSuccess$ = this._actions$
    .pipe(ofType(fromUser.DELETE_SUCCESS))
    .pipe(
      tap(() => {
        this.snackBar.openFromComponent(UserSnackComponent, {
          duration: 1000,
          data: 'User Deleted',
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
      })
    );

  @Effect({ dispatch: false })
    deleteFailure$ = this._actions$
    .pipe(ofType(fromUser.DELETE_FAILURE))
    .pipe(
      map((action: fromUser.DeleteFailure) => action.payload),
      tap(() =>
        this.snackBar.openFromComponent(UserSnackComponent, {
          duration: 1000,
          data: 'User Deletion Failure',
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        })
      )
    );

  @Effect({ dispatch: false })
  saveDescription$ = this._actions$
    .pipe(ofType(fromUser.SAVE_DESCRIPTION))
    .pipe(
      map((action: fromUser.SaveDescription) => action.payload),
      tap(payload => localStorage.setItem(`user${payload.userId}Desciption`, payload.text))
    );

  constructor(private _actions$: Actions, private _userApiService: UserApiService, private snackBar: MatSnackBar) { }
}
