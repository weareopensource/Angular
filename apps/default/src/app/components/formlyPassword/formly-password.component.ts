import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'formly-password',
 template: `
  <input type="password" [formControl]="formControl" [formlyAttributes]="field">
  <input type="password" [formControl]="formControl" [formlyAttributes]="field">
 `
})
export class FormlyPasswordComponent extends FieldType {}
