import { Authenticate } from '../../models/authenticate.model';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first, keys } from 'lodash';
import { GoogleSignInSuccess } from '../google-sign-in/google-sign-in.component';
declare let FB;

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy, OnInit {

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
  public login = new EventEmitter<Authenticate | String>();

  @Output()
  public email = new EventEmitter<string>();

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

  public clientId = '307800239261-8ghk4lu2me211p9ucialjl6ujer8v10j.apps.googleusercontent.com';

  constructor(
    private _formBuilder: FormBuilder
  ) {
  }

  public onLoginSubmit(): void {
    this.login.emit(this.loginForm.value);
  }

  public onForgotPasswordSubmit(email: string): void {
    this.email.emit(email);
    this.forgotPassword = false;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  public google(): void {
    this.login.emit('google');
  }

  public facebook(): void {
    this.login.emit('facebook');
  }

  public github(): void {
    this.login.emit('github');
  }

  public twitter(): void {
    this.login.emit('twitter');
  }

  onGoogleSignInSuccess(event: GoogleSignInSuccess): void {
    this.login.emit('google',);
    const googleUser: gapi.auth2.GoogleUser = event.googleUser;
    const profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    console.log(`profile: ${JSON.stringify(profile)}`); // Do not send to your backend! Use an ID token instead.
  }

  checkLoginState(): void {
    FB.getLoginStatus(response => {
      console.log(response);
    });
  }
}
