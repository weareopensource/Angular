import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAutentication from '../+state/actions/authentication-state.actions';
import { AuthenticationState } from '../+state/states/authentication-state.state';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthenticationInitializationService {
  constructor(private _store: Store<AuthenticationState>) {}

  loadUser(): any {
    const response = JSON.parse(localStorage.getItem('ng2-ui-auth.token'));
    const idToken = response ? response.id_token : undefined;
    const tokenExpiresIn = idToken ? (jwtDecode(idToken) as any).exp * 1000 : undefined;

    if (tokenExpiresIn) {
      if (tokenExpiresIn > Date.now()) {
        this._store.dispatch(new fromAutentication.LoadUser('google'));
      } else {
        this._store.dispatch(new fromAutentication.Logout('Token expired'));
      }
    }
  }
}
