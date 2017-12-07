import { HomeComponent, NotFoundComponent } from './components';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreGuard } from './services';
import { AuthenticationGuard } from '../authentication/services';

const coreRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [ AuthenticationGuard ],
    component: HomeComponent
  },
  {
    path: 'command',
    canActivate: [ AuthenticationGuard ],
    canLoad: [ AuthenticationGuard ],
    loadChildren: '../command/command.module#RootCommandModule'
  },
//  { path: 'forbiden', component: ForbidenComponent, data: { title: 'Forbiden'} },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      title: 'Not-Found'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(coreRoutes)
  ],
  providers: [ CoreGuard ]
})
export class CoreRoutingModule { }
