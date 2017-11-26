import { HomeComponent, NotFoundComponent } from './components';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'app/authentication/services';
import { RoleGuard } from './services';
import { TestComponent } from 'app/test2/components';

const coreRoutes: Routes = [{
  path: '',
  component: HomeComponent,
  canActivate:  [ AuthenticationGuard ],
  children: [{
    path: 'test2',
    data: {
      expectedRoles: ['admin']
    },
    canActivate:  [ RoleGuard ],
    loadChildren: 'app/test2/test2.module#RootTest2Module',
  }, {
    path: '**',
    component: NotFoundComponent,
  }]
}];

@NgModule({
  imports: [
    RouterModule.forRoot(coreRoutes)
  ],
  providers: [ RoleGuard ]
})
export class CoreRoutingModule { }
