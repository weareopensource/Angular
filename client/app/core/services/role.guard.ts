import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromAuth from 'app/authentication/store';
import * as fromRouter from 'app/store/router';
import { difference } from 'lodash';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    return this.store
      .select(fromAuth.getUser)
      .map(user => {
        const expectedRoles = route.data.expectedRoles;
        if (difference(user.roles, expectedRoles).length === expectedRoles.length) {
          this.store.dispatch(new fromRouter.Go({path: ['/', 'auth']}));
          return false;
        }
        return true;
      })
      .take(1);
  }
}
