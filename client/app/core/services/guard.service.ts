import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as action from 'app/authentication/store/authentication.actions';
import * as fromAuth from 'app/authentication/store/authentication.selectors';
import * as fromAuth1 from 'app/authentication/store/reducers';

@Injectable()
export class GuardService implements CanActivate {
  constructor(private store: Store<fromAuth1.State>) { }

  canActivate(): Observable<boolean> {
    return this.store
      .select(fromAuth.getLoggedIn)
      .map(authed => {
        if (!authed) {
          this.store.dispatch(new action.LoginRedirect());
          return false;
        }
        return true;
      })
      .take(1);
  }
}
