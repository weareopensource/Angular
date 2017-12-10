import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreGuardService } from './services/core.guard.service';
import { ArticleComponent } from '../article/components/article/article.component';
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
    path: 'article',
    canActivate: [ AuthenticationGuardService ],
    canLoad: [ AuthenticationGuardService ],
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
  providers: [ CoreGuardService ]
})
export class CoreRoutingModule { }
