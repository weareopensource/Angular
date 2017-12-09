import { combineLatest } from "rxjs/observable/combineLatest";
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operators/first';
import { AuthenticationComponent } from '../components/authentication/authentication.component';
import * as AuthenticationActions from '../store/authentication.actions';
import { AuthenticationState } from '../store/authentication.interfaces';
import { AuthenticationSelectorsService } from '../store/authentication.selectors.service';

@Injectable()
export class AuthenticationGuardService implements CanActivate, CanLoad {
  constructor(
    private store: Store<AuthenticationState>,
    private router: Router,
    private authenticationSelectorsService: AuthenticationSelectorsService) { }

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
      this.store.select(this.authenticationSelectorsService.getLoggedIn),
      this.store.select(this.authenticationSelectorsService.getTokenExpiresIn),
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
