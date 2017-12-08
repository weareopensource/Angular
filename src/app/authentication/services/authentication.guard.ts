import { combineLatest } from "rxjs/observable/combineLatest";
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operators/first';
import { AuthenticationComponent } from '../components/authentication';
import * as AuthenticationActions from '../store/authentication.actions';
import { AuthenticationState } from '../store';
import { AuthenticationSelectors } from '../store';
import { RouterSelectors } from 'app/router-store.module';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanLoad {
  constructor(
    private store: Store<AuthenticationState>,
    private router: Router,
    private appSelectors: RouterSelectors,
    private authenticationSelectors: AuthenticationSelectors) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const currentUrl = route.url[0].path;
    return this.hasPermission(currentUrl);
  }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    const currentUrl = route.path;
    return this.hasPermission(currentUrl);
  }

  hasPermission(path: string) {
    return combineLatest(
      this.store.select(this.authenticationSelectors.getLoggedIn),
      this.store.select(this.authenticationSelectors.getTokenExpiresIn),
      (loggedIn, tokenExpiresIn) => {
        if (loggedIn) {
          if (path === 'auth') {
            this.router.navigate(['/', 'home']);
          }
          return true;
        } else {
          if (tokenExpiresIn) {
            if (tokenExpiresIn < Date.now()) {
              if (path === 'auth') {
                this.router.navigate(['/', 'home']);
              }
              return true;
            } else {
              this.store.dispatch(new AuthenticationActions.Logout());
              return false;
            }
          } else {
            if (path === 'auth') {
              return true;
            }
            this.router.navigate(['/', 'auth']);
            return false;
          }
        }
      }).pipe(first());
  }
}
