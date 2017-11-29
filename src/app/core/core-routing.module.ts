import { HomeComponent, NotFoundComponent } from './components';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'app/authentication/services';
import { RoleGuard } from './services';

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
  providers: [ RoleGuard ]
})
export class CoreRoutingModule { }
