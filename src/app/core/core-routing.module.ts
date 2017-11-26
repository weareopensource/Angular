import { HomeComponent, NotFoundComponent } from './components';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreGuard } from './services';
import { ArticleComponent } from '../article/components';
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
    path: 'article',
    canActivate: [ AuthenticationGuard ],
    canLoad: [ AuthenticationGuard ],
    loadChildren: '../article/article.module#RootArticleModule'
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
