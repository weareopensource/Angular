import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/take';
import {
  AuthenticationState,
  fromAuthentication,
  getLoggedIn } from '@labdat/authentication-state';
import { fromRouter } from '@labdat/router-state';
import { filter } from 'rxjs/operators';

@Injectable()
export class AuthenticationGuardService implements CanActivate, CanLoad {
  constructor(private store: Store<AuthenticationState>) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean | Promise<boolean> {
    const currentUrl = route.url[0].path;

    return this.hasPermission(currentUrl);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    const currentUrl = route.path;

    return this.hasPermission(currentUrl);
  }

  hasPermission(path: string): boolean | Observable<boolean> | Promise<boolean> {
    return Observable.combineLatest(
      this.store.select(getLoggedIn),
      loggedIn => {
        const tokenExpiresIn = Number(sessionStorage.getItem('tokenExpiresIn'));
        if (loggedIn) {
          if (path === 'auth') {
            this.store.dispatch(new fromRouter.Go({ path: ['/', 'home'] }));

            return false;
          }

          return true;
        } else {
          if (tokenExpiresIn) {
            if (tokenExpiresIn > Date.now()) {
              if (path === 'auth') {
                this.store.dispatch(new fromRouter.Go({ path: ['/', 'home'] }));

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
              this.store.dispatch(new fromRouter.Go({ path: ['/', 'auth'] }));

              return false;
            }
          }
        }
      })
      .pipe(
        filter(pass => pass)
      );
  }
}
