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
import 'rxjs/add/observable/from';
import { TaskApiService } from '../services/task.api.service';
import * as TaskActions from './task.actions';
//import { Database } from '@ngrx/db';
import { keyBy } from 'lodash';
import { fromAuthentication } from '@labdat/authentication-state';

@Injectable()
export class TaskEffects {

  @Effect()
  loginSuccess$ = this.actions$
    .ofType(fromAuthentication.LOGIN_SUCCESS)
    .pipe(
      mapTo(new TaskActions.Load())
    )

  @Effect()
  load$ = this.actions$
    .ofType(TaskActions.LOAD)
    .pipe(
      switchMap(() => this.taskApiService.loadTasks()),
      map((response: any) => new TaskActions.LoadSuccess({tasks: response})),
      catchError(error => of(new TaskActions.LoadFailure(error)))
    )

  @Effect()
  add$ = this.actions$
    .ofType(TaskActions.ADD)
    .pipe(
      map(toPayload),
      switchMap((payload) => this.taskApiService.addTask(payload.task)),
      map((response: any) => new TaskActions.AddSuccess({task: response.task})),
      catchError(error => of(new TaskActions.AddFailure(error)))
    )
;

  @Effect()
  update$ = this.actions$
    .ofType(TaskActions.UPDATE)
    .pipe(
      map(toPayload),
      switchMap((payload) => this.taskApiService.updateTask(payload.task)),
      map((response: any) => new TaskActions.UpdateSuccess({ task: { id: response.id, changes: {...response} }})),
      catchError(error => of(new TaskActions.UpdateFailure(error)))
    )

  @Effect()
  delete$ = this.actions$
    .ofType(TaskActions.DELETE)
    .pipe(
      map(toPayload),
      switchMap((payload) => this.taskApiService.deleteTask(payload.taskId)),
      map((response: any) => new TaskActions.DeleteSuccess({taskId: response.id})),
      catchError(error => of(new TaskActions.DeleteFailure(error)))
    )

    @Effect({dispatch: false})
    saveDescription$ = this.actions$
      .ofType(TaskActions.SAVE_DESCRIPTION)
      .pipe(
        map(toPayload),
        tap((payload) => sessionStorage.setItem(`task${payload.taskId}Desciption`, payload.text))
      )

/*
  @Effect()
  handle$ = this.actions$
    .ofType(TaskActions.HANDLE)
    .map(toPayload)
    .switchMap(id => this.taskApiService.handle(id))
    .catch(error => of(new TaskActions.HandleFailure(error)));
*/
  constructor(
    private actions$: Actions,
    private taskApiService: TaskApiService,
    private router: Router,
  ) {}
}
