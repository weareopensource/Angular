import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegisterComponent } from './components/register/register.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LogoutDirective } from './directives/logout/logout.directive';
import { AuthenticationInterceptorService } from './services/authentication.interceptor.service';
import { AuthenticationGuardService } from './services/authentication.guard.service';

const COMPONENTS = [AuthenticationComponent, LoginComponent, RegisterComponent];

const DIRECTIVES = [LogoutDirective];

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
  imports: [CommonModule, ...MATERIAL_MODULES, FlexLayoutModule, ReactiveFormsModule],
  declarations: [...COMPONENTS, ...DIRECTIVES],
  exports: DIRECTIVES
})
export class AuthenticationModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [
        AuthenticationGuardService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthenticationInterceptorService,
          multi: true
        }
      ]
    };
  }
}
