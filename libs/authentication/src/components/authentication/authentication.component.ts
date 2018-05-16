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
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationComponent {
  public pending$ = this.store.select(getLoginPagePending);
  public error$ = this.store.select(getLoginPageError);

  constructor(private store: Store<AuthenticationState>) {}

  onLogin(authenticate: Authenticate | String): void {
    switch (authenticate) {
      case 'google':
        this.store.dispatch(new fromAuthentication.GoogleLogin());

        break;
      case 'facebook':
        this.store.dispatch(new fromAuthentication.FacebookLogin());

        break;
      case 'twitter':
        this.store.dispatch(new fromAuthentication.TwitterLogin());

        break;
      case 'github':
        this.store.dispatch(new fromAuthentication.GithubLogin());
        break;
      default:
        this.store.dispatch(new fromAuthentication.LocalLogin(authenticate as Authenticate));
    }
  }

  onEmail(email: string): void {
    this.store.dispatch(new fromAuthentication.ChangePassword({ email }));
  }

  onRegister(registration: any): void {
    this.store.dispatch(new fromAuthentication.Register(registration));
  }
}
