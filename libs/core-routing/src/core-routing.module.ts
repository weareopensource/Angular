import { HomeComponent, LayoutComponent, NotFoundComponent } from '@labdat/core/core-components';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreGuardService } from './services/core.guard.service';
import { AuthenticationGuardService } from '@labdat/authentication';
import { RoleGuardService } from '@labdat/authentication';
import { AuthenticationComponent, ProfileComponent } from '@labdat/authentication';
import { TaskGuardService } from '@labdat/task-routing';

const coreRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: {
          page: 'home'
        }
      },
      {
        path: 'auth',
        component: AuthenticationComponent,
        canActivate: [AuthenticationGuardService],
        data: {
          page: 'authentication'
        }
      },
      {
        path: 'admin',
        loadChildren: '../../admin/src/admin.module#RootAdminModule',
        canActivate: [AuthenticationGuardService, RoleGuardService],
        data: {
          page: 'users-management',
          roles: ['admin']
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthenticationGuardService],
        data: {
          page: 'profile'
        }
      },
      {
        path: 'tasks',
        canActivate: [AuthenticationGuardService, TaskGuardService],
//        canLoad: [AuthenticationGuardService],
        loadChildren: '../../task/src/task.module#RootTaskModule'
      },
      {
        path: '**',
        component: NotFoundComponent,
        data: {
          title: 'Not-Found'
        }
      }
    ]
  }
];
//  { path: 'forbiden', component: ForbidenComponent, data: { title: 'Forbiden'} },

@NgModule({
  imports: [RouterModule.forRoot(coreRoutes)],
  providers: [CoreGuardService]
})
export class CoreRoutingModule {}
