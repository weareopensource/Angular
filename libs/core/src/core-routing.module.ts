import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreGuardService } from './services/core.guard.service';
import { AuthenticationGuardService, RoleGuardService } from '@labdat/authentication';
// import { ProfileComponent } from '@labdat/authentication';
import { TaskGuardService } from '@labdat/task';

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
        loadChildren: '../../authentication/src/routing-authentication.module#RoutingAuthenticationModule',
        canActivate: [ AuthenticationGuardService ],
        data: {
          page: 'authentication'
        }
      },
      {
        path: 'admin',
        loadChildren: '../../administration/src/routing-administration.module#RoutingAdministrationModule',
        canActivate: [ AuthenticationGuardService, RoleGuardService ],
        data: {
          page: 'administration',
          roles: ['admin']
        }
      },
      {
        path: 'tasks',
        loadChildren: '../../task/src/routing-task.module#RoutingTaskModule',
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
export class CoreRoutingModule { }
