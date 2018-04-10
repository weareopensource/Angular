import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthenticationState } from '../../+state/states/authentication-state.state';
import * as fromAuthentication from '../../+state/actions/authentication-state.actions';
import {
  getLoginPageError,
  getLoginPagePending
} from '../../+state/selectors/authentication-state.selectors';
import { Store } from '@ngrx/store';
import { Authenticate } from '../../models/authenticate.model';

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
