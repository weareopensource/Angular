import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as Actions from '../../store/authentication.actions'
import * as Selectors from '../../store/authentication.selectors'
import { AuthenticationState } from '../../store/authentication.interfaces';
import { Store } from '@ngrx/store';
import { Authenticate } from '../../models';

@Component({
  selector: 'app-auth',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  pending$ = this.store.select(Selectors.getLoginPagePending);
  error$ = this.store.select(Selectors.getLoginPageError);

  constructor(private store: Store<AuthenticationState>) { }

  onSubmit($event: Authenticate) {
    this.store.dispatch(new Actions.Login($event));
  }
}
