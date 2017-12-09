import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as AuthenticationActions from '../../store/authentication.actions';
import { AuthenticationState } from '../../store/authentication.interfaces';
import { AuthenticationSelectorsService } from '../../store/authentication.selectors.service';
import { Store } from '@ngrx/store';
import { Authenticate } from '../../models/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  public pending$ = this.store.select(this.authenticationSelectorsService.getLoginPagePending);
  public error$ = this.store.select(this.authenticationSelectorsService.getLoginPageError);

  constructor(private store: Store<AuthenticationState>, private authenticationSelectorsService: AuthenticationSelectorsService) { }

  onSubmit($event: Authenticate) {
    this.store.dispatch(new AuthenticationActions.Login($event));
  }
}
