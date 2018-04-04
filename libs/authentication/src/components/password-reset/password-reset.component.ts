import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationState, fromAuthentication } from '@labdat/authentication-state';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  public hide = true;
  public form = this._formBuilder.group({
    password: this._formBuilder.control('')
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<AuthenticationState>,
    private _activatedRoute: ActivatedRoute) {}

  get visibility(): string {
    return this.hide ? 'action:ic_visibility_off_24px' : 'action:ic_visibility_24px';
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => ({}));
  }

  onSubmit(): void {
    this._store.dispatch(new fromAuthentication.ResetPassword({
      newPassword: this.form.value.password,
      token: this._activatedRoute.snapshot.queryParams.token
    }));
  }
}
