import { Injectable } from '@angular/core';
import * as AuthenticationActions from 'app/authentication/store/authentication.actions'
import * as AuthenticationSelectors from 'app/authentication/store/authentication.selectors'
import { Authenticate } from 'app/authentication/models';

@Injectable()
export class AuthenticationStore {

  public getLoggedIn = AuthenticationSelectors.getLoggedIn
  public getUser = AuthenticationSelectors.getUser
  
  public getLoginPageError = AuthenticationSelectors.getLoginPageError;
  public getLoginPagePending = AuthenticationSelectors.getLoginPagePending;
  
  login({ email, password }: Authenticate) {
    return new AuthenticationActions.Login({ email, password });
  }

  logout() {
    return new AuthenticationActions.Logout();
  }
}
