import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'formly-password-group',
 template: `
<mat-form-field>
  <input
    matInput
    placeholder="Password"
    type="password"
    [type]="hide ? 'password' : 'text'"
    [formControl]="formControl"
    [formlyAttributes]="field"
    required>
    <input
    matInput
    placeholder="Password"
    type="password"
    [type]="hide ? 'password' : 'text'"
    [formlyAttributes]="field"
    required>
  <mat-icon [svgIcon]="visibility" matSuffix (click)="hide = !hide"></mat-icon>
  <mat-error *ngIf="form.controls['password'].invalid" i18n>You must enter a value</mat-error>
</mat-form-field>
 `
})
export class FormlyPasswordGroupComponent extends FieldType {
  constructor() {
    super();
  }
  public hide = true;

  get visibility(): string {
    return this.hide ? 'action:ic_visibility_off_24px' : 'action:ic_visibility_24px';
  }
}
