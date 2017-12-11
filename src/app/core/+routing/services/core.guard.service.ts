import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUser } from 'app/authentication/+store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { take } from 'rxjs/operators/take';
import { difference } from 'lodash';
import { fromApplication } from 'app/application/+store';

@Injectable()
export class CoreGuardService implements CanActivate {
  constructor(
    private store: Store<any>,
    private router: Router,) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    return this.store.select(getUser)
      .pipe(
        map(user => this.hasExpectedRoles(user, route)),
        take(1)
      );
  }

  hasExpectedRoles(user, route) {
    const expectedRoles = route.data.expectedRoles;
    if (difference(user.roles, expectedRoles).length === expectedRoles.length) {
      this.store.dispatch(new fromApplication.Go({ path: ['/', 'auth'] }));
      return false;
    }
    return true;
  }
}
