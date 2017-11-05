import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as action from '../store/authentication.actions';
import * as fromAuth1 from '../store/reducers';
import * as fromAuth from '../store/authentication.selectors';
import { difference } from 'lodash';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private store: Store<fromAuth1.State>, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    return this.store
      .select(fromAuth.getUser)
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
