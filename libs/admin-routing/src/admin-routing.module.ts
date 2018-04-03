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
    canActivate: [ UserGuardService ],
    data: {
      page: 'user-list'
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
      page: 'user-detail'
    }
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [ RouterModule.forChild(adminsRoutes) ]
})
export class RootAdminRoutingModule {}

@NgModule()
export class AdminRoutingModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdminRoutingModule,
      providers: [ UserGuardService ]
    };
  }
}
