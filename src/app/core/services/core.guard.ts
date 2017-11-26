import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { difference } from 'lodash';
import { AuthenticationSelectors } from 'app/authentication/store';

@Injectable()
export class CoreGuard implements CanActivate {
  constructor(
    private store: Store<any>,
    private router: Router,
    private authenticationSelectors: AuthenticationSelectors) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    return this.store
      .select(this.authenticationSelectors.getUser)
      .map(user => {
        const expectedRoles = route.data.expectedRoles;
        if (difference(user.roles, expectedRoles).length === expectedRoles.length) {
          this.router.navigate(['/', 'auth']);
          return false;
        }
        return true;
      })
      .take(1);
  }
}
