import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'formly-password',
 template: `
  <mat-form-field>
    <input
      matInput
      [type]="hide ? 'password' : 'text'"
      [formControl]="formControl"
      [formlyAttributes]="field">
    <mat-icon [svgIcon]="visibility" matSuffix (click)="hide = !hide"></mat-icon>
    <mat-error *ngIf="formControl.invalid" i18n>You must enter a value</mat-error>
  </mat-form-field>
 `
})
export class FormlyPasswordComponent extends FieldType {

  public hide = true;

  get visibility(): string {
    return this.hide ? 'action:ic_visibility_off_24px' : 'action:ic_visibility_24px';
  }

}
