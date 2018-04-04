import { Authenticate } from './../../models/user.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;

    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Input()
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

  public matcher = new MyErrorStateMatcher();

  get visibility(): string {
    return this.hide ? 'action:ic_visibility_off_24px' : 'action:ic_visibility_24px';
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
