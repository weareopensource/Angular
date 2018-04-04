import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import { fromRouter } from '@labdat/router-state';
import { AuthenticationState } from '@labdat/authentication-state';
import { Store } from '@ngrx/store';

@Injectable()
export class PasswordResetGuardService implements CanActivate {
  constructor(private _store: Store<AuthenticationState>) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean | Promise<boolean> {
    if (route.queryParams.token) {
      const token: any = jwtDecode(route.queryParams.token);
      if (token.tokenExpiresIn > Date.now()) {

        return true;
      }
      this._store.dispatch(new fromRouter.Go({ path: ['auth'] }));

      return false;
    }
    this._store.dispatch(new fromRouter.Go({ path: ['auth'] }));

    return false;
  }
}
