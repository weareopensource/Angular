import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthenticationActions from '../store/authentication.actions';
import { AuthenticationState } from '../store';

@Injectable()
export class AuthenticationInitialisation  {
  constructor(private store: Store<AuthenticationState>) { }

  loadUser() {
    const tokenExpiresIn = parseInt(sessionStorage.getItem('tokenExpiresIn'), 10);
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (tokenExpiresIn) {
      if (tokenExpiresIn < Date.now()) {
        this.store.dispatch(new AuthenticationActions.LoadUser({ user, tokenExpiresIn }));
      } else {
        sessionStorage.removeItem('tokenExpiresIn');
        sessionStorage.removeItem('user');
      }
    }
  }
}
