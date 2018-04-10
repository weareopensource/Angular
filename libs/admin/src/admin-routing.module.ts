import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAddComponent } from './components/add/user-add.component';
import { UserDetailComponent } from './components/detail/user-detail.component';
import { UserEditComponent } from './components/edit/user-edit.component';
import { UsersListComponent } from './components/list/users-list.component';
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
    path: 'users/:id',
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
export class AdminRoutingModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAdminRoutingModule,
      providers: [ UserGuardService ]
    };
  }
}

// tslint:disable-next-line:max-classes-per-file
@NgModule()
export class RootAdminRoutingModule { }
