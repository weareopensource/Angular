import { map } from 'rxjs/operators/map';
import { take } from 'rxjs/operators/take';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { difference } from 'lodash';
import { AuthenticationSelectorsService } from 'app/authentication';

@Injectable()
export class ArticleGuardService implements CanActivate {
  constructor(
    private store: Store<any>,
    private router: Router,
    private authenticationSelectorsService: AuthenticationSelectorsService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean>{
    return this.store.select(this.authenticationSelectorsService.getUser)
      .pipe(
        map(user => {
          const expectedRoles = route.data.expectedRoles;
          if (difference(user.roles, expectedRoles).length === expectedRoles.length) {
            this.router.navigate(['/', 'auth']);
            return false;
          }
          return true;
        }),
        take(1)
      );
  }
}
