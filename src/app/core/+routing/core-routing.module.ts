import { HomeComponent } from 'app/core/components/home/home.component';
import { LayoutComponent } from 'app/core/components/layout/layout.component';
import { NotFoundComponent } from 'app/core/components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreGuardService } from './services/core.guard.service';
import { AuthenticationGuardService } from 'app/authentication';
import { AuthenticationComponent } from 'app/authentication/components/authentication/authentication.component';

const coreRoutes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}, {
  path: '',
  component: LayoutComponent,
  children: [{
    path: 'home',
    canActivate: [ AuthenticationGuardService ],
    component: HomeComponent
  }, {
    path: 'auth',
    component: AuthenticationComponent,    
    canActivate: [ AuthenticationGuardService ],
  }, {
    path: 'command',
    canActivate: [ AuthenticationGuardService ],
    canLoad: [ AuthenticationGuardService ],
    loadChildren: '../../command/command.module#RootCommandModule'
  }, {
    path: 'article',
    canActivate: [ AuthenticationGuardService ],
    canLoad: [ AuthenticationGuardService ],
    loadChildren: '../../article/article.module#RootArticleModule'
  }, {
    path: '**',
    component: NotFoundComponent,
    data: {
      title: 'Not-Found'
    }
  }]
}];
//  { path: 'forbiden', component: ForbidenComponent, data: { title: 'Forbiden'} },

@NgModule({
  imports: [
    RouterModule.forRoot(coreRoutes)
  ],
  providers: [ CoreGuardService ]
})
export class CoreRoutingModule { }
