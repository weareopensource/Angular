import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/take';
import { AuthenticationState } from '../+state/states/authentication-state.state';
import * as fromAuthentication from '../+state/actions/authentication-state.actions';
import { getLoggedIn } from '../+state/selectors/authentication-state.selectors';
import { fromRouter } from '@labdat/common/router-state';
import { map } from 'rxjs/operators/map';

@Injectable()
export class AuthenticationGuardService implements CanActivate, CanLoad {
  constructor(private store: Store<AuthenticationState>) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean | Promise<boolean> {
    const currentUrl = route.url[0].path;

    return this.hasPermission(currentUrl, route);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    const currentUrl = route.path;

    return this.hasPermission(currentUrl, undefined);
  }

  hasPermission(path: string, route: ActivatedRouteSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.store.select(getLoggedIn)
    .pipe(
      map(loggedIn => {
        const tokenExpiresIn = Number(localStorage.getItem('tokenExpiresIn'));
        if (loggedIn) {
          if (path === 'auth' && route.children[0].url[0].path !== 'profile') {
            this.store.dispatch(new fromRouter.Go({ path: ['home'] }));
            return false;
          }

          return true;
        } else {
          if (tokenExpiresIn) {
            if (tokenExpiresIn > Date.now()) {
              if (path === 'auth') {
                this.store.dispatch(new fromRouter.Go({ path: ['home'] }));

                return false;
              } else {
                this.store.dispatch(new fromAuthentication.LoadUser());

                return false;
              }
            } else {
              this.store.dispatch(new fromAuthentication.Logout('Token expired'));

              return false;
            }
          } else {
            if (path === 'auth') {

              return true;
            } else {
              this.store.dispatch(new fromRouter.Go({ path: ['auth'] }));

              return false;
            }
          }
        }
      })
    );
  }
}
