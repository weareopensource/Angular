import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/take';
import {
  AuthenticationState,
  getUser } from '@labdat/authentication-state';
import { fromRouter } from '@labdat/router-state';
import { intersection } from 'lodash';
import { User } from '@labdat/data-models';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(private store: Store<AuthenticationState>) { }

  private currentUser$ = this.store.select(getUser);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean | Promise<boolean> {
    const roles = route.data.roles;

    return this.currentUser$.pipe(
      map((user: User) => {
        if (user) {
          if (intersection(user.roles, roles).length > 0) {
            return true;
          } else {
            this.store.dispatch(new fromRouter.Go({ path: ['home'] }));
        // redirect to not-authorized component

            return false;
          }
        }
      }),
      filter(x => x !== undefined)
    );
  }
}
