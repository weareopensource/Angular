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
import { CommandApiService } from '../services/command.api.service';
import * as fromCommand from '../actions/command.actions';
//import { Database } from '@ngrx/db';
import { keyBy } from 'lodash';
import { fromAuthentication } from 'app/authentication/+store';

@Injectable()
export class CommandEffectsService {

  @Effect()
  loginSuccess$ = this.actions$
    .ofType(fromAuthentication.LOGIN_SUCCESS)
    .mapTo(new fromCommand.Load())

  @Effect()
  load$ = this.actions$
    .ofType(fromCommand.LOAD)
    .switchMap(() => this.commandApiService.getHandled())
    .map((response: any) => new fromCommand.LoadSuccess(keyBy(response.commands, 'id')))
    .catch(error => of(new fromCommand.LoadFailure(error)));

  @Effect()
  handle$ = this.actions$
    .ofType(fromCommand.HANDLE)
    .map(toPayload)
    .switchMap(id => this.commandApiService.handle(id))
    .catch(error => of(new fromCommand.HandleFailure(error)));

  constructor(
    private actions$: Actions,
    private commandApiService: CommandApiService,
    private router: Router,
  ) {}
}
