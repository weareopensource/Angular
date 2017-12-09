import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreGuardService } from './services/core.guard.service';
import { AuthenticationGuardService } from 'app/authentication';

const coreRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [ AuthenticationGuardService ],
    component: HomeComponent
  },
  {
    path: 'command',
    canActivate: [ AuthenticationGuardService ],
    canLoad: [ AuthenticationGuardService ],
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
  providers: [ CoreGuardService ]
})
export class CoreRoutingModule { }
