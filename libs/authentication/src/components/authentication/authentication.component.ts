import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AuthenticationState,
  fromAuthentication,
  getLoginPageError,
  getLoginPagePending
} from '@labdat/authentication-state';
import { Store } from '@ngrx/store';
import { Authenticate } from '../../models/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationComponent {
  public pending$ = this.store.select(getLoginPagePending);
  public error$ = this.store.select(getLoginPageError);

  constructor(private store: Store<AuthenticationState>) {}

  onLogin(authenticate: Authenticate): void {
    this.store.dispatch(new fromAuthentication.Login(authenticate));
  }

  onEmail(email: string): void {
    this.store.dispatch(new fromAuthentication.ChangePassword({ email }));
  }

  onRegister(registration: any): void {
    this.store.dispatch(new fromAuthentication.Register(registration));
  }
}
