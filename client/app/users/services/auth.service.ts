import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { select } from '@angular-redux/store';
import { UsersService } from './users.service';
import { Observable } from 'rxjs/Observable';
import { IUserRecord } from 'app/core';

@Injectable()
export class Auth implements CanActivate, CanActivateChild {
  userRoles = [];
  @select(['session', 'user']) user$: Observable<IUserRecord>;

  constructor(private usersService: UsersService) {}

  canActivate(route) {
    this.user$.first().subscribe(user => this.userRoles = user.roles);
    if (route.data.roles.indexOf('*') !== -1) {
        return true;
      } else {
        if (!this.userRoles) {
          return false;
        }

        for (var userRoleIndex in this.userRoles) {
          if (this.userRoles.hasOwnProperty(userRoleIndex)) {
            for (var roleIndex in route.data.roles) {
              if (route.data.roles.hasOwnProperty(roleIndex) && route.data.roles[roleIndex] === this.userRoles[userRoleIndex]) {
                return true;
              }
            }
          }
        }
      }
      return false;
    }

    canActivateChild(route) {
      return this.canActivate(route);
    }

}
