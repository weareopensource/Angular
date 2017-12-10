import { LayoutComponent } from 'app/core/components/layout/layout.component';
import { HomeComponent } from 'app/core/components/home/home.component';
import { NotFoundComponent } from 'app/core/components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreGuardService } from './services/core.guard.service';
import { AuthenticationGuardService } from 'app/authentication/+routing';

const coreRoutes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}, {
  path: '',
  component: LayoutComponent,
  children: [ {
    path: 'home',
    canActivate: [ AuthenticationGuardService ],
    component: HomeComponent
  }, {
    path: 'article',
    canActivate: [ AuthenticationGuardService ],
    canLoad: [ AuthenticationGuardService ],
    loadChildren: '../article/article.module#RootArticleModule'
  }]
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
