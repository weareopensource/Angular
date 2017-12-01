import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import * as AppAction from './app.actions';

@Injectable()
export class RouterEffects {
  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(AppAction.GO)
    .map(toPayload)
    .do(({ path, query: queryParams, extras}) => this.router.navigate(path, { queryParams, ...extras }));

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.ofType(AppAction.BACK)
    .do(() => this.location.back());

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.ofType(AppAction.FORWARD)
    .do(() => this.location.forward());    

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) { }
}
