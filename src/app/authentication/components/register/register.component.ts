import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationApi } from '../../services';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public hide = true;
  public form = this.formBuilder.group({
    gender: this.formBuilder.control(''),
    firstName: this.formBuilder.control(''),
    lastName: this.formBuilder.control(''),
    email: this.formBuilder.control('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)
    ]),
    password: this.formBuilder.control('')
  });

  constructor(
    private formBuilder: FormBuilder,
    private authenticationApi: AuthenticationApi) {
  }

  get visibility() {
    return this.hide ? 'action:ic_visibility_off_24px' : 'action:ic_visibility_24px';
  }

  get emailErrorMessage() {
    let errorMessage = '';
    if (this.form.controls.email.hasError('required')) {
      errorMessage = 'You must enter a value';
    } else if (this.form.controls.email.hasError('email')) {
      errorMessage = 'Not a valid email';
    }
    return errorMessage;
  }

  ngOnInit() {
   this.form.valueChanges.subscribe(() => ({}));
  }

  onSubmit() {
    const { name, email, password } = this.form.value;
  //  this.authService.register(name, email, password)
  //  .subscribe(console.log);
  }

}
