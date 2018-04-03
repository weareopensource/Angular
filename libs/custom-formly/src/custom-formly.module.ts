import { FormlyPasswordComponent } from './components/formly-password/formly-password.component';
import { FormlyPasswordGroupComponent } from './components/formly-password-group/formly-password-group.component';
import { FormlyModule } from '@ngx-formly/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const COMPONENTS = [
  FormlyPasswordComponent,
  FormlyPasswordGroupComponent
];

const MATERIAL_MODULES = [
  MatIconModule,
  MatInputModule,
  MatFormFieldModule
];

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
    FormlyModule
],
  declarations: COMPONENTS
})
export class CustomFormlyModule { }
