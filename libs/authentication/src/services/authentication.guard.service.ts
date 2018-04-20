import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthenticationState } from '../+state/states/authentication-state.state';
import * as fromAuthentication from '../+state/actions/authentication-state.actions';
import { getLoggedIn } from '../+state/selectors/authentication-state.selectors';
import { fromRouter } from '@labdat/common/router-state';
import { map } from 'rxjs/operators/map';

@Injectable()
export class AuthenticationGuardService implements CanActivate {
  constructor(private store: Store<AuthenticationState>) { }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean | Promise<boolean> {

    const path = state.url.split('/')[1];

    return this.store.select(getLoggedIn)
    .pipe(
      map(loggedIn => {
        const tokenExpiresIn = Number(localStorage.getItem('tokenExpiresIn'));
        if (loggedIn) {
          if (path === 'auth') {
            this.store.dispatch(new fromRouter.Go({ path: ['home'] }));

            return false;
          }

          return true;
        }

        if (tokenExpiresIn) {
          if (tokenExpiresIn > Date.now()) {
            if (path === 'auth') {
              this.store.dispatch(new fromRouter.Go({ path: ['home'] }));
            }
            this.store.dispatch(new fromAuthentication.LoadUser());

            return false;
          }

          this.store.dispatch(new fromAuthentication.Logout('Token expired'));

          return false;
        }

        if (path === 'auth') {

          return true;
        }
        this.store.dispatch(new fromRouter.Go({ path: ['auth'] }));

        return false;
      })
    );
  }
}
