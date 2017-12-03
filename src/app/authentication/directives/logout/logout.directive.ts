import { Directive, HostListener } from '@angular/core';
import * as AuthenticationActions from '../../store/authentication.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store';

@Directive({
  selector: '[Logout]',
})
export class LogoutDirective {
  constructor(private store: Store<AppState>) { }
  @HostListener('click', ['$event'])
  onLogout(event) {
    console.log('ok')
    this.store.dispatch(new AuthenticationActions.Logout());
  }
}
