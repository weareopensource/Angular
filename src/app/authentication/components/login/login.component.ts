import { Authenticate } from './../../models';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input()
  public errorMessage: string | null;

  @Output()
  public submitted = new EventEmitter<Authenticate>();

  public hide = true;
  public form = this.formBuilder.group({
    email: this.formBuilder.control('', [ Validators.required, Validators.email ]),
    password: this.formBuilder.control('', [ Validators.required ])
  });

  get visibility() {
    return this.hide ? 'action:ic_visibility_off_24px' : 'action:ic_visibility_24px';
  }

  constructor(private formBuilder: FormBuilder) { }

  onSubmit() {
    this.submitted.emit(this.form.value);
  }
}
