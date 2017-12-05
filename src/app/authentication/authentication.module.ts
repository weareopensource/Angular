import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent, LoginComponent, RegisterComponent, LoginSnackComponent } from './components';
import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationApi, AuthenticationInterceptor, AuthenticationGuard, AuthenticationSelectors, AuthenticationInitialisation } from './services';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authenticationReducers, AuthenticationEffects } from './store';
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

function initialisationFactory(authenticationInitialisation) {
  return () => authenticationInitialisation.loadUser();
}

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
        AuthenticationApi,
        AuthenticationGuard,
        AuthenticationSelectors,
        AuthenticationInitialisation,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthenticationInterceptor,
          multi: true
        },
        { provide: APP_INITIALIZER, useFactory: initialisationFactory, deps: [AuthenticationInitialisation], multi: true }        
      ],
    };
  }
}

@NgModule({
  imports: [
    AuthenticationModule,
    AuthenticationRoutingModule,
    StoreModule.forFeature('authentication', authenticationReducers),
    EffectsModule.forFeature([ AuthenticationEffects ])
  ],
})
export class RootAuthenticationModule {}
