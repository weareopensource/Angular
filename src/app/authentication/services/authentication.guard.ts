import { AuthenticationComponent } from '../components/authentication/authentication.component';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import "rxjs/add/observable/zip";
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromAuth from '../store';
import * as fromRouter from 'app/store/router';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>, private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    const currentUrl$ = this.store.select(fromRouter.getCurrentUrl).first();
    const loggedIn$ = this.store.select(fromAuth.getLoggedIn).first();
    return Observable.zip(currentUrl$, loggedIn$)
      .map(([currentUrl, loggedIn]) => {
        if (loggedIn) {
          if (currentUrl === '/auth') {
            this.store.dispatch(new fromRouter.Go({ path: ['/', 'home'] }));
          }
          return true;
        } else {
          const tokenExpiresIn = parseInt(sessionStorage.getItem('tokenExpiresIn'), 10);
          const user = JSON.parse(sessionStorage.getItem('user'));
          if (tokenExpiresIn) {
            if (tokenExpiresIn < Date.now()) {
              this.store.dispatch(new fromAuth.LoadUser({ user }));
              if (currentUrl === '/auth') {
                this.store.dispatch(new fromRouter.Go({ path: ['/', 'home'] }));
              }
              return true;
            } else {
              this.store.dispatch(new fromAuth.Logout());
              return false;
            }
          } else {
            if (currentUrl === '/auth') {
              return true;
            }
            this.store.dispatch(new fromRouter.Go({ path: ['/', 'auth'] }));
            return false;
          }
        }
      });
  }
}
