import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as fromAuth from '../../store';
import { Store } from '@ngrx/store';
import { Authenticate } from '../../models';

@Component({
  selector: 'app-auth',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  pending$ = this.store.select(fromAuth.getLoginPagePending);
  error$ = this.store.select(fromAuth.getLoginPageError);

  constructor(private store: Store<fromAuth.State>) { }

  onSubmit($event: Authenticate) {
    this.store.dispatch(new fromAuth.Login($event));
  }
}
