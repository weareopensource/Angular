import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Authenticate } from '../../models/user.model';
import { ConfirmValidParentMatcher, CustomValidators } from './password-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public confirmValidParentMatcher = new ConfirmValidParentMatcher();
  public hide = true;
  public registerForm = this.formBuilder.group({
    firstName: this.formBuilder.control('', [Validators.required]),
    lastName: this.formBuilder.control('', [Validators.required]),
    emailGroup: this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      confirmEmail: this.formBuilder.control('', Validators.required)
    }, { validator: CustomValidators.childrenEqual }),
    passwordGroup: this.formBuilder.group({
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: this.formBuilder.control('', Validators.required)
    }, { validator: CustomValidators.childrenEqual })
  });

  @Output() public submitted = new EventEmitter<Authenticate>();

  constructor(private formBuilder: FormBuilder) {
    this.registerForm.valueChanges.subscribe(() => console.log(this.registerForm));
  }

  get visibility(): string {
    return this.hide ? 'action:ic_visibility_off_24px' : 'action:ic_visibility_24px';
  }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe(() => ({}));
  }

  onSubmit(): void {
    this.submitted.emit(this.registerForm.value);
  }
}
