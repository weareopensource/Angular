import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthenticationGuardService } from './services/authentication.guard.service';
import { AuthenticationComponent } from 'app/authentication/components/authentication/authentication.component';

export const authenticationRoutes: Routes = [{
  path: 'auth',
  canActivate: [ AuthenticationGuardService ],
  component: AuthenticationComponent
}];

@NgModule()
export class AuthenticationRoutingModule {
  public static forRoot() {
    return {
      ngModule: AuthenticationRoutingModule,
      providers: [
        AuthenticationGuardService
      ]
    }
  }
}
