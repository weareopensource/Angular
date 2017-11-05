import { AuthenticationComponent } from '../components/authentication/authentication.component';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as action from '../store/authentication.actions';
import * as fromAuth from '../store/authentication.selectors';
import * as fromAuth1 from '../store/reducers';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private store: Store<fromAuth1.State>, private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    return this.store
      .select(fromAuth.getLoggedIn)
      .map(authed => {
        if (authed) {
          return true;
        } else {
          const tokenExpiresIn = parseInt(sessionStorage.getItem('tokenExpiresIn'), 10);
          const user = JSON.parse(sessionStorage.getItem('user'));
          if (tokenExpiresIn) {
            if (tokenExpiresIn < Date.now()) {
              this.store.dispatch(new action.LoginSuccess({ user }));
              return true;
            } else {
              this.store.dispatch(new action.Logout());
              return false;
            }
          } else {
            this.router.navigate(['/', 'auth']);
            return false;
          }
        }
      })
      .take(1);
  }
}
