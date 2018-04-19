import { Authenticate } from '../../models/authenticate.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first, keys } from 'lodash';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Input('isPending')
  set pending(isPending: boolean) {
    if (isPending) {
      this.loginForm.disable();
    } else {
      this.loginForm.enable();
    }
  }

  @Input()
  public errorMessage: string | null;

  @Output()
  public loginSubmitted = new EventEmitter<Authenticate>();

  @Output()
  public emailSubmitted = new EventEmitter<string>();

  public forgotPassword = false;

  public hide = true;
  public loginForm = this._formBuilder.group({
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    password: this._formBuilder.control('', [Validators.required])
  });

  public forgotControl = this._formBuilder.control('', [
    Validators.required,
    Validators.email
  ]);

  get visibility(): string {
    return this.hide ? 'action:ic_visibility_off_24px' : 'action:ic_visibility_24px';
  }

  get emailError(): string {
    return first(keys(this.loginForm.get('email').errors)) || '';
  }

  get forgotError(): string {
    return first(keys(this.forgotControl.errors)) || '';
  }

  get passwordError(): string {
    return first(keys(this.loginForm.get('password').errors)) || '';
  }

  constructor(private _formBuilder: FormBuilder) {}

  public onLoginSubmit(): void {
    this.loginSubmitted.emit(this.loginForm.value);
  }

  public onForgotPasswordSubmit(email: string): void {
    this.emailSubmitted.emit(email);
    this.forgotPassword = false;
  }
}
