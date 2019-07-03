import { Injectable } from '@angular/core';
import { map, catchError, tap, switchMap, switchMapTo } from 'rxjs/operators';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { of } from 'rxjs';
import { TaskApiService } from '../services/task.api.service';
import * as fromTasks from './task.actions';
import { Task } from '../models/task.model';
import { TaskSnackComponent } from '../components/task-snack/task-snack.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TaskEffects {

  @Effect()
  load$ = this._actions$
    .pipe(ofType(fromTasks.LOAD))
    .pipe(
      switchMapTo(this._taskApiService.loadTasks()),
      map((response: any) => new fromTasks.LoadSuccess({ tasks: response })),
      catchError(error => of(new fromTasks.LoadFailure(error)))
    );

  @Effect({ dispatch: false })
    loadFailure$ = this._actions$
    .pipe(ofType(fromTasks.LOAD_FAILURE))
    .pipe(
      map((action: fromTasks.LoadFailure) => action.payload),
      tap(() =>
        this.snackBar.openFromComponent(TaskSnackComponent, {
          duration: 1000,
          data: 'User Load Failure',
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        })
      )
    );

  @Effect()
  add$ = this._actions$
    .pipe(ofType(fromTasks.ADD))
    .pipe(
      map((action: fromTasks.Add) => action.payload),
      switchMap(payload => this._taskApiService.addTask(payload.task)),
      map((task: Task) => new fromTasks.AddSuccess({ task })),
      catchError(error => of(new fromTasks.AddFailure({ error })))
    );

  @Effect({ dispatch: false })
    addSuccess$ = this._actions$
    .pipe(ofType(fromTasks.ADD_SUCCESS))
    .pipe(
      tap(() => {
        this.snackBar.openFromComponent(TaskSnackComponent, {
          duration: 1000,
          data: 'Task Created',
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
      })
    );

  @Effect({ dispatch: false })
    addFailure$ = this._actions$
    .pipe(ofType(fromTasks.ADD_FAILURE))
    .pipe(
      map((action: fromTasks.AddFailure) => action.payload),
      tap(() =>
        this.snackBar.openFromComponent(TaskSnackComponent, {
          duration: 1000,
          data: 'Task Creation Failure',
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        })
      )
    );

  @Effect()
  update$ = this._actions$
    .pipe(ofType(fromTasks.UPDATE))
    .pipe(
      map((action: fromTasks.Update) => action.payload),
      switchMap(payload => this._taskApiService.updateTask(payload.task)),
      map((response: any) => new fromTasks.UpdateSuccess({ task: { id: response.id, changes: { ...response } } })),
      catchError(error => of(new fromTasks.UpdateFailure(error)))
    );

  @Effect({ dispatch: false })
    updateSuccess$ = this._actions$
    .pipe(ofType(fromTasks.UPDATE_SUCCESS))
    .pipe(
      tap(() => {
        this.snackBar.openFromComponent(TaskSnackComponent, {
          duration: 1000,
          data: 'Task Updated',
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
      })
    );

  @Effect({ dispatch: false })
    updateFailure$ = this._actions$
    .pipe(ofType(fromTasks.UPDATE_FAILURE))
    .pipe(
      map((action: fromTasks.UpdateFailure) => action.payload),
      tap(() =>
        this.snackBar.openFromComponent(TaskSnackComponent, {
          duration: 1000,
          data: 'Task Update Failure',
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        })
      )
    );

  @Effect()
  delete$ = this._actions$
    .pipe(ofType(fromTasks.DELETE))
    .pipe(
      map((action: fromTasks.Delete) => action.payload),
      switchMap(payload => this._taskApiService.deleteTask(payload.taskId)),
      map((response: any) => new fromTasks.DeleteSuccess(response)),
      catchError(error => of(new fromTasks.DeleteFailure(error)))
    );

  @Effect({ dispatch: false })
    deleteSuccess$ = this._actions$
    .pipe(ofType(fromTasks.DELETE_SUCCESS))
    .pipe(
      tap(() => {
        this.snackBar.openFromComponent(TaskSnackComponent, {
          duration: 1000,
          data: 'Task Deleted',
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
      })
    );

  @Effect({ dispatch: false })
    deleteFailure$ = this._actions$
    .pipe(ofType(fromTasks.DELETE_FAILURE))
    .pipe(
      map((action: fromTasks.DeleteFailure) => action.payload),
      tap(() =>
        this.snackBar.openFromComponent(TaskSnackComponent, {
          duration: 1000,
          data: 'Task Deletion Failure',
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        })
      )
    );

  @Effect({ dispatch: false })
  saveDescription$ = this._actions$
    .pipe(ofType(fromTasks.SAVE_DESCRIPTION))
    .pipe(
      map((action: fromTasks.SaveDescription) => action.payload),
      tap(payload => localStorage.setItem(`task${payload.taskId}Desciption`, payload.text))
    );

  constructor(private _actions$: Actions, private _taskApiService: TaskApiService, private snackBar: MatSnackBar) { }
}
