import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAutentication from '../actions/authentication.actions';
import { AuthenticationState } from '../states/authentication.state';

@Injectable()
export class AuthenticationInitializationService  {
  constructor(private store: Store<AuthenticationState>) { }

  loadUser() {
    const tokenExpiresIn = Number(sessionStorage.getItem('tokenExpiresIn'));
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (tokenExpiresIn) {
      if (tokenExpiresIn < Date.now()) {
        this.store.dispatch(new fromAutentication.LoadUser({ user, tokenExpiresIn }));
      } else {
        this.store.dispatch(new fromAutentication.Logout());        
      }
    }
  }
}
