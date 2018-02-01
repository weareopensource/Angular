import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { catchError } from 'rxjs/operators/catchError';
import { mapTo } from 'rxjs/operators/mapTo';
import { tap } from 'rxjs/operators/tap';

import { defer } from 'rxjs/observable/defer';
import { toPayload } from '@ngrx/effects';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { TaskApiService } from '../services/task.api.service';
import * as fromTasks from './task.actions';
import * as fromConnecForm from '@labdat/connect-form-state/src/+state/actions/connect-form-state.actions';

//import { Database } from '@ngrx/db';
import { keyBy } from 'lodash';
import { fromAuthentication } from '@labdat/authentication-state';

@Injectable()
export class TaskEffects {

  @Effect()
  loginSuccess$ = this.actions$
    .ofType(fromAuthentication.LOGIN_SUCCESS)
    .pipe(
      mapTo(new fromTasks.Load())
    )

  @Effect()
  load$ = this.actions$
    .ofType(fromTasks.LOAD)
    .pipe(
      switchMap(() => this.taskApiService.loadTasks()),
      map((response: any) => new fromTasks.LoadSuccess({tasks: response})),
      catchError(error => of(new fromTasks.LoadFailure(error)))
    )

  @Effect()
  add$ = this.actions$
    .ofType(fromTasks.ADD)
    .pipe(
      map(toPayload),
      switchMap((payload) => this.taskApiService.addTask(payload.task)),
      map((response: any) => new fromConnecForm.SubmitFormSuccess({ path: 'addTaskForm'})),
      catchError(error => of(new fromConnecForm.SubmitFormError({ path: 'addTaskForm', error: error })))
    )
;

  @Effect()
  update$ = this.actions$
    .ofType(fromTasks.UPDATE)
    .pipe(
      map(toPayload),
      switchMap((payload) => this.taskApiService.updateTask(payload.task)),
      map((response: any) => new fromTasks.UpdateSuccess({ task: { id: response.id, changes: {...response} }})),
      catchError(error => of(new fromTasks.UpdateFailure(error)))
    )

  @Effect()
  delete$ = this.actions$
    .ofType(fromTasks.DELETE)
    .pipe(
      map(toPayload),
      switchMap((payload) => this.taskApiService.deleteTask(payload.taskId)),
      map((response: any) => new fromTasks.DeleteSuccess({taskId: response.id})),
      catchError(error => of(new fromTasks.DeleteFailure(error)))
    )

    @Effect({dispatch: false})
    saveDescription$ = this.actions$
      .ofType(fromTasks.SAVE_DESCRIPTION)
      .pipe(
        map(toPayload),
        tap((payload) => sessionStorage.setItem(`task${payload.taskId}Desciption`, payload.text))
      )

/*
  @Effect()
  handle$ = this.actions$
    .ofType(fromTasks.HANDLE)
    .map(toPayload)
    .switchMap(id => this.taskApiService.handle(id))
    .catch(error => of(new fromTasks.HandleFailure(error)));
*/
  constructor(
    private actions$: Actions,
    private taskApiService: TaskApiService,
    private router: Router,
  ) {}
}
