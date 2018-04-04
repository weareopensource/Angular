import { AuthenticationComponent } from '@labdat/authentication/src/components/authentication/authentication.component';
import { ProfileComponent } from '@labdat/authentication/src/components/profile/profile.component';
import { PasswordResetComponent } from '@labdat/authentication/src/components/password-reset/password-reset.component';

import { AuthenticationGuardService } from './services/authentication.guard.service';
import { RoleGuardService } from './services/role.guard.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordResetGuardService } from './services/password-reset.guard.service';

const authenticationRoutes: Routes = [
  {
    path: '',
    component: AuthenticationComponent
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent,
    canActivate: [ PasswordResetGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthenticationGuardService ],
    data: {
      page: 'profile'
    }
  }
];
//  { path: 'forbiden', component: ForbidenComponent, data: { title: 'Forbiden'} },
/*
if (!isEmpty(taskConfiguration.self.roles)) {
  Object.assign(tasksRoutes[0], {
    data: {
      expectedRoles: taskConfiguration.self.roles
    }
  });
}
*/

@NgModule({
  imports: [ RouterModule.forChild(authenticationRoutes) ]
})
export class RootAuthenticationRoutingModule { }

@NgModule()
export class AuthenticationRoutingModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthenticationRoutingModule,
      providers: [
        AuthenticationGuardService,
        PasswordResetGuardService,
        RoleGuardService
      ]
    };
  }
}
