import { AuthenticationComponent } from '../components/authentication/authentication.component';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import "rxjs/add/observable/zip";
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as AuthenticationActions from '../store/authentication.actions';
import * as AuthenticationSelectors from '../store/authentication.selectors';
import { AuthenticationState } from '../store/authentication.interfaces';
import { AppStore } from 'app/services';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private store: Store<AuthenticationState>, private router: Router, private appStore: AppStore) { }

  canActivate(): Observable<boolean> | boolean {
    const currentUrl$ = this.store.select(this.appStore.getCurrentUrl).first();
    const loggedIn$ = this.store.select(AuthenticationSelectors.getLoggedIn).first();
    return Observable.zip(currentUrl$, loggedIn$, (currentUrl, loggedIn) => {
      if (loggedIn) {
        if (currentUrl === '/auth') {
          this.store.dispatch(this.appStore.go({ path: ['/', 'home'] }));
        }
        return true;
      } else {
        const tokenExpiresIn = parseInt(sessionStorage.getItem('tokenExpiresIn'), 10);
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (tokenExpiresIn) {
          if (tokenExpiresIn < Date.now()) {
            this.store.dispatch(new AuthenticationActions.LoadUser({ user }));
            if (currentUrl === '/auth') {
              this.store.dispatch(this.appStore.go({ path: ['/', 'home'] }));
            }
            return true;
          } else {
            this.store.dispatch(new AuthenticationActions.Logout());
            return false;
          }
        } else {
          if (currentUrl === '/auth') {
            return true;
          }
          this.store.dispatch(this.appStore.go({ path: ['/', 'auth'] }));
          return false;
        }
      }
    });
  }
}
