import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as AuthenticationActions from '../../store/authentication.actions';
import { AuthenticationState } from '../../store';
import { AuthenticationSelectors } from '../../store';
import { Store } from '@ngrx/store';
import { Authenticate } from '../../models';

@Component({
  selector: 'app-auth',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  public pending$ = this.store.select(this.authenticationSelectors.getLoginPagePending);
  public error$ = this.store.select(this.authenticationSelectors.getLoginPageError);

  constructor(private store: Store<AuthenticationState>, private authenticationSelectors: AuthenticationSelectors) { }

  onSubmit($event: Authenticate) {
    this.store.dispatch(new AuthenticationActions.Login($event));
  }
}
