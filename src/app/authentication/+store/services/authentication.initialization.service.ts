import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthenticationActions from './authentication.actions';
import { AuthenticationState } from './authentication.interfaces';

@Injectable()
export class AuthenticationInitializationService  {
  constructor(private store: Store<AuthenticationState>) { }

  loadUser() {
    const tokenExpiresIn = Number(sessionStorage.getItem('tokenExpiresIn'));
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (tokenExpiresIn) {
      if (tokenExpiresIn < Date.now()) {
        this.store.dispatch(new AuthenticationActions.LoadUser({ user, tokenExpiresIn }));
      } else {
        this.store.dispatch(new AuthenticationActions.Logout());        
      }
    }
  }
}
