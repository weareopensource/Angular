import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  UserAddComponent,
  UserDetailComponent,
  UserEditComponent,
  UsersListComponent } from '@labdat/admin/components';
import { UserGuardService } from './services/user.guard.service';

const adminsRoutes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [UserGuardService],
    data: {
      page: 'xlist'
    },
    children: [
      {
        path: 'add',
        component: UserAddComponent,
        pathMatch: 'full'
      },
      {
        path: ':id/edit',
        component: UserEditComponent,
        pathMatch: 'full'
      }
    ]
//    canDeactivate: [TaskGuardService]
  },
  {
    path: ':id',
    component: UserDetailComponent,
    data: {
      page: 'xdetail'
    }
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];
/*
if (!isEmpty(taskConfiguration.self.roles)) {
  Object.assign(tasksRoutes[0], {
    data: {
      expectedRoles: taskConfiguration.self.roles
    }
  });
}
*/

@NgModule()
export class RootAdminRoutingModule {}

@NgModule({
  imports: [RouterModule.forChild(adminsRoutes)]
})
export class AdminRoutingModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAdminRoutingModule,
      providers: [ UserGuardService ]
    };
  }
}
