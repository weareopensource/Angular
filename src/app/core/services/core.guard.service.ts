import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationSelectorsService } from 'app/authentication';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { take } from 'rxjs/operators/take';
import { difference } from 'lodash';

@Injectable()
export class CoreGuardService implements CanActivate {
  constructor(
    private store: Store<any>,
    private router: Router,
    private authenticationSelectorsService: AuthenticationSelectorsService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    return this.store.select(this.authenticationSelectorsService.getUser)
      .pipe(
        map(user => this.hasExpectedRoles(user, route)),
        take(1)
      );
  }

  hasExpectedRoles(user, route) {
    const expectedRoles = route.data.expectedRoles;
    if (difference(user.roles, expectedRoles).length === expectedRoles.length) {
      this.router.navigate(['/', 'auth']);
      return false;
    }
    return true;
  }
}
