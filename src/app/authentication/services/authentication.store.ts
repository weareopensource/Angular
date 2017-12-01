import { Injectable } from '@angular/core';
import * as Actions from '../store/authentication.actions'
import * as Selectors from '../store/authentication.selectors'
import { Authenticate } from '../models';

@Injectable()
export class AuthenticationStore {

  public getLoggedIn = Selectors.getLoggedIn
  public getUser = Selectors.getUser
  
  public getLoginPageError = Selectors.getLoginPageError;
  public getLoginPagePending = Selectors.getLoginPagePending;
  
  login({ email, password }: Authenticate) {
    return new Actions.Login({ email, password });
  }

  logout() {
    return new Actions.Logout();
  }
}
