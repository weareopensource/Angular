import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as fromAuth from '../../store/authentication.selectors';
import * as fromAuth1 from '../../store/reducers';
import * as action from '../../store/authentication.actions';
import { Store } from '@ngrx/store';
import { Authenticate } from '../../models';

@Component({
  selector: 'app-auth',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  pending$ = this.store.select(fromAuth.getLoginPagePending);
  error$ = this.store.select(fromAuth.getLoginPageError);

  constructor(private store: Store<fromAuth1.State>) {}

  ngOnInit() {
  }

  onSubmit($event: Authenticate) {
    this.store.dispatch(new action.Login($event));
  }
}
