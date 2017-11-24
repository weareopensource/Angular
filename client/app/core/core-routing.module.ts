import { HomeComponent, NotFoundComponent } from './components';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard, RoleGuard } from 'app/authentication/services';

const coreRoutes: Routes = [{
  path: '',
  component: HomeComponent,
//  canActivate:  [ AuthenticationGuard ],
//  children: [{
//    path: 'admin',
//    data: {
//      expectedRoles: ['admin']
//    },
//    canActivate:  [ RoleGuard ],
//    loadChildren: 'app/admin/admin.module#AdminModule',
//  }, {
//    path: '',
//    data: {
//      expectedRoles: ['admin', 'prothesist']
//    },
//    canActivate:  [ RoleGuard ],
//    loadChildren: 'app/commands/commands.module#CommandsModule',
//  }]
}, {
  path: '**',
  component: NotFoundComponent,
}];

@NgModule({
  imports: [
    RouterModule.forRoot(coreRoutes)
  ],
//  providers: [ GuardService ]
})
export class CoreRoutingModule { }
