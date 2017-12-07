import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent, LoginComponent, RegisterComponent, LoginSnackComponent } from './components';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationApi, AuthenticationInterceptor, AuthenticationGuard } from './services';
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
import { LogoutDirective } from './directives';

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
    HttpClientModule,
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
        AuthenticationApi,
        AuthenticationGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthenticationInterceptor,
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
