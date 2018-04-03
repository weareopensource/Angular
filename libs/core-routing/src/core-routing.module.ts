import { HomeComponent, LayoutComponent, NotFoundComponent } from '@labdat/core/core-components';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreGuardService } from './services/core.guard.service';
import { AuthenticationGuardService, RoleGuardService } from '@labdat/authentication-routing';
// import { ProfileComponent } from '@labdat/authentication';
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
        loadChildren: '../../authentication/src/authentication.module#RootAuthenticationModule',
        canActivate: [ AuthenticationGuardService ],
        data: {
          page: 'authentication'
        }
      },
      {
        path: 'admin',
        loadChildren: '../../admin/src/admin.module#RootAdminModule',
        canActivate: [ AuthenticationGuardService, RoleGuardService ],
        data: {
          page: 'administration',
          roles: ['admin']
        }
      },
      {
        path: 'tasks',
        loadChildren: '../../task/src/task.module#RootTaskModule',
        canActivate: [ AuthenticationGuardService, TaskGuardService ],
//        canLoad: [ AuthenticationGuardService ],
        data: {
          page: 'task',
          roles: ['user']
        }
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
  imports: [ RouterModule.forRoot(coreRoutes) ],
  providers: [ CoreGuardService ]
})
export class CoreRoutingModule {}
