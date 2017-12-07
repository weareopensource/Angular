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
import { CommandApi } from '../services/command.api';
import * as CommandActions from './command.actions';
//import { Database } from '@ngrx/db';
import { keyBy } from 'lodash';
import * as AuthenticationActions from 'app/authentication/store/authentication.actions';

@Injectable()
export class CommandEffects {

  @Effect()
  loginSuccess$ = this.actions$
    .ofType(AuthenticationActions.LOGIN_SUCCESS)
    .mapTo(new CommandActions.Load())

  @Effect()
  load$ = this.actions$
    .ofType(CommandActions.LOAD)
    .switchMap(() => this.commandApi.getHandled())
    .map((response: any) => new CommandActions.LoadSuccess(keyBy(response.commands, 'id')))
    .catch(error => of(new CommandActions.LoadFailure(error)));

  @Effect()
  handle$ = this.actions$
    .ofType(CommandActions.HANDLE)
    .map(toPayload)
    .switchMap(id => this.commandApi.handle(id))
    .catch(error => of(new CommandActions.HandleFailure(error)));

  constructor(
    private actions$: Actions,
    private commandApi: CommandApi,
    private router: Router,
  ) {}
}
