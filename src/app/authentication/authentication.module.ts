import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginSnackComponent } from './components/login-snack/login-snack.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationApiService } from './services/authentication.api.service';
import { AuthenticationGuardService } from './services/authentication.guard.service';
import {
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatCardModule,
  MatInputModule,
  MatTabsModule,
  MatRadioModule,
  MatSnackBarModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { LogoutDirective } from './directives/logout/logout.directive';
import { AuthenticationInterceptorService } from './services/authentication.interceptor.service';

const COMPONENTS = [
  AuthenticationComponent,
  LoginComponent,
  RegisterComponent,
  LoginSnackComponent
];

const DIRECTIVES = [
  LogoutDirective
];

const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatCardModule,
  MatInputModule,
  MatTabsModule,
  MatRadioModule,
  MatSnackBarModule
];

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  declarations: [ ...COMPONENTS, ...DIRECTIVES ],
  entryComponents: [LoginSnackComponent],
  exports: [ ...COMPONENTS, ...DIRECTIVES ],
})
export class AuthenticationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthenticationModule,
      providers: [
        AuthenticationApiService,
        AuthenticationGuardService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthenticationInterceptorService,
          multi: true
        },
      ],
    };
  }
}

@NgModule({
  imports: [
    AuthenticationModule,
    AuthenticationRoutingModule
  ],
})
export class RootAuthenticationModule {}
