import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthenticationGuardService } from './services/authentication.guard.service';
import { AuthenticationComponent } from 'app/authentication/components/authentication/authentication.component';
import { RouterModule } from '@angular/router';

export const authenticationRoutes: Routes = [{
  path: 'auth',
  canActivate: [ AuthenticationGuardService ],
  component: AuthenticationComponent
}];

@NgModule({
  imports: [
    RouterModule.forRoot(authenticationRoutes)
  ],
  providers: [
    AuthenticationGuardService
  ]
})
export class AuthenticationRoutingModule {}
