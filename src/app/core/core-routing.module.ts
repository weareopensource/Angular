import { HomeComponent, NotFoundComponent } from './components';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreGuard } from './services';

const coreRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'not-found', component: NotFoundComponent, data: { title: 'Not-Found'} },
//  { path: 'forbiden', component: ForbidenComponent, data: { title: 'Forbiden'} },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(coreRoutes)
  ],
  providers: [ CoreGuard ]
})
export class CoreRoutingModule { }
