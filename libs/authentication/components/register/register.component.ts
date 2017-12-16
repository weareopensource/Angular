import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Authenticate } from '../../models/user.model';

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
      Validators.email
    ]),
    password: this.formBuilder.control('')
  });

  @Output()
  public submitted = new EventEmitter<Authenticate>();

  constructor(
    private formBuilder: FormBuilder) {
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
    const { firstName, lastName, email, password } = this.form.value;
    this.submitted.emit(this.form.value);
  }

}
