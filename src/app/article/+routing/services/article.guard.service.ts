import { map } from 'rxjs/operators/map';
import { take } from 'rxjs/operators/take';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { difference } from 'lodash';
import { getUser } from 'app/authentication/+store';
import { fromApplication } from 'app/application/+store';

@Injectable()
export class ArticleGuardService implements CanActivate {
  constructor(
    private store: Store<any>,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean>{
    return this.store.select(getUser)
      .pipe(
        map(user => {
          const expectedRoles = route.data.expectedRoles;
          if (difference(user.roles, expectedRoles).length === expectedRoles.length) {
            this.store.dispatch(new fromApplication.Go({ path:['/', 'auth'] }));
            return false;
          }
          return true;
        }),
        take(1)
      );
  }
}
