import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { DisableControlDirective } from './directives/disable-control/disable-control.directive';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

const COMPONENTS = [
  AuthenticationComponent,
  LoginComponent,
  RegisterComponent,
  ProfileComponent,
  PasswordResetComponent
];

const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatTabsModule,
  MatRadioModule,
  MatSnackBarModule,
  MatInputModule,
  MatDialogModule,
  MatSelectModule
];

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [...COMPONENTS, DisableControlDirective]
})
export class AuthenticationViewModule { }
