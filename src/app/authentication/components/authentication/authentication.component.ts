import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as AuthenticationActions from 'app/shared/store/authentication/authentication.actions';
import { AuthenticationSelectors } from 'app/shared/services/authentication';
import { AuthenticationState } from 'app/shared/store/authentication';
import { Store } from '@ngrx/store';
import { Authenticate } from '../../models';

@Component({
  selector: 'app-auth',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  public pending$ = this.store.select(this.authenticatoinSelectors.getLoginPagePending);
  public error$ = this.store.select(this.authenticatoinSelectors.getLoginPageError);

  constructor(private store: Store<AuthenticationState>, private authenticatoinSelectors: AuthenticationSelectors) { }

  onSubmit($event: Authenticate) {
    this.store.dispatch(new AuthenticationActions.Login($event));
  }
}
