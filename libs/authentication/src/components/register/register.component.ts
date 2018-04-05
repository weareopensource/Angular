import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Authenticate } from '../../models/user.model';
//import { PasswordValidation } from './password-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public hide = true;
  public form = this.formBuilder.group({
    firstName: this.formBuilder.control('', [Validators.required]),
    lastName: this.formBuilder.control('', [Validators.required]),
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', [Validators.required]),
    confirmPassword: this.formBuilder.control('', [Validators.required])
  });

  @Output() public submitted = new EventEmitter<Authenticate>();

  constructor(private formBuilder: FormBuilder) {}

  get visibility(): string {
    return this.hide ? 'action:ic_visibility_off_24px' : 'action:ic_visibility_24px';
  }

  get emailErrorMessage(): string {
    let errorMessage = '';
    if (this.form.controls.email.hasError('required')) {
      errorMessage = 'You must enter a value';
    } else if (this.form.controls.email.hasError('email')) {
      errorMessage = 'Not a valid email';
    }

    return errorMessage;
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => ({}));
  }

  onSubmit(): void {
    this.submitted.emit(this.form.value);
  }
}
