import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components';
import { AuthenticationGuard } from './services';

const authRoutes: Routes = [{
  path: 'auth',
  component: AuthenticationComponent,
  canActivate: [ AuthenticationGuard ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  providers: [
    AuthenticationGuard,
  ]
})
export class AuthenticationRoutingModule {}
