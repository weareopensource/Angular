import { Directive, HostListener } from '@angular/core';
import * as AuthenticationActions from 'app/shared/store/authentication/authentication.actions';
import { Store } from '@ngrx/store';

@Directive({
  selector: '[Logout]',
})
export class LogoutDirective {
  constructor(private store: Store<any>) { }
  @HostListener('click', ['$event'])
  onLogout(event) {
    this.store.dispatch(new AuthenticationActions.Logout());
  }
}
