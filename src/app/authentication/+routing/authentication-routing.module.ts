import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from 'app/authentication/components/authentication/authentication.component';
import { AuthenticationModule } from 'app/authentication';
import { AuthenticationGuardService } from './services/authentication.guard.service';

const authRoutes: Routes = [{
  path: 'auth',
  component: AuthenticationComponent,
  canActivate: [ AuthenticationGuardService ]
}];

@NgModule({
  imports: [
    AuthenticationModule,
    RouterModule.forChild(authRoutes)
  ],
  providers: [
    AuthenticationGuardService,
  ]
})
export class AuthenticationRoutingModule {}
