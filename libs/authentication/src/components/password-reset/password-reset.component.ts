import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationState, fromAuthentication } from '@labdat/authentication-state';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { ConfirmValidParentMatcher, CustomValidators } from './password-match.validator';
import { first, keys } from 'lodash';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  public hide = true;
  public confirmValidParentMatcher = new ConfirmValidParentMatcher();
  public resetPasswordForm = this._formBuilder.group({
    password: this._formBuilder.control(''),
    confirmPassword: this._formBuilder.control('')
  }, { validator: CustomValidators.childrenEqual });

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<AuthenticationState>,
    private _activatedRoute: ActivatedRoute) {}

  get visibility(): string {
    return this.hide ? 'action:ic_visibility_off_24px' : 'action:ic_visibility_24px';
  }

  get passwordError(): string {
    return first(keys(this.resetPasswordForm.get('password').errors)) || '';
  }

  get confirmPasswordError(): string {
    return first(keys(this.resetPasswordForm.errors)) || '';
  }

  ngOnInit(): void {
    this.resetPasswordForm.valueChanges.subscribe(() => ({}));
  }

  onSubmit(): void {
    this._store.dispatch(new fromAuthentication.ResetPassword({
      newPassword: this.resetPasswordForm.value.password,
      token: this._activatedRoute.snapshot.queryParams.token
    }));
  }
}
