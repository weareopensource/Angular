import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent, LoginComponent, RegisterComponent, LoginSnackComponent } from './components';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationApi, AuthenticationInterceptor, AuthenticationGuard } from './services';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects } from './store/authentication.effects';
import { reducers } from './store/reducers';
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

const COMPONENTS = [
  AuthenticationComponent,
  LoginComponent,
  RegisterComponent,
  LoginSnackComponent
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
  declarations: COMPONENTS,
  entryComponents: [LoginSnackComponent],
  exports: COMPONENTS,
})
export class AuthenticationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthenticationModule,
      providers: [
        AuthenticationApi,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthenticationInterceptor,
          multi: true
        }
      ],
    };
  }
}

@NgModule({
  imports: [
    AuthenticationModule,
    AuthenticationRoutingModule,
    StoreModule.forFeature('authentication', reducers),
    EffectsModule.forFeature([ AuthenticationEffects ]),
  ],
})
export class RootAuthenticationModule {}
