import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components';
import { AuthenticationGuard, RoleGuard } from './services';

const authRoutes: Routes = [{
  path: 'auth',
  component: AuthenticationComponent,
//  canDeactivate: [ GuardService ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  providers: [
    AuthenticationGuard,
    RoleGuard
  ]
})
export class AuthenticationRoutingModule {}
