import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { difference } from 'lodash';
import { AuthenticationStore } from 'app/authentication/services';
import { AppStore } from 'app/services';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private store: Store<any>,
    private router: Router,
    private authenticationStore: AuthenticationStore,
    private appStore: AppStore) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    return this.store
      .select(this.authenticationStore.getUser)
      .map(user => {
        const expectedRoles = route.data.expectedRoles;
        if (difference(user.roles, expectedRoles).length === expectedRoles.length) {
          this.store.dispatch(this.appStore.go({path: ['/', 'auth']}));
          return false;
        }
        return true;
      })
      .take(1);
  }
}
