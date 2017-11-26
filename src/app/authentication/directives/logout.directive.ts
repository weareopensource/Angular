import { Directive, HostListener } from '@angular/core';
import * as AuthenticationActions from '../store/authentication.actions';
import { Store } from '@ngrx/store';
import { AuthenticationState } from '../store';

@Directive({
  selector: '[Logout]',
})
export class LogoutDirective {
  constructor(private store: Store<AuthenticationState>) { }
  @HostListener('click', ['$event'])
  onLogout(event) {
    this.store.dispatch(new AuthenticationActions.Logout());
  }
}
