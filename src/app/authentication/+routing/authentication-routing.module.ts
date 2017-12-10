import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { AuthenticationGuardService } from './services/authentication.guard.service';

const authRoutes: Routes = [{
  path: 'auth',
  component: AuthenticationComponent,
  canActivate: [ AuthenticationGuardService ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  providers: [
    AuthenticationGuardService,
  ]
})
export class AuthenticationRoutingModule {}
