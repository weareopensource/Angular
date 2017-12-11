import { Directive, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticationState, fromAuthentication } from 'app/authentication/+store';

@Directive({
  selector: '[Logout]',
})
export class LogoutDirective {
  constructor(private store: Store<AuthenticationState>) { }
  @HostListener('click', ['$event'])
  onLogout(event) {
    console.log('???')
    this.store.dispatch(new fromAuthentication.Logout());
  }
}
