import { RouterModule, Routes } from '@angular/router';
// APP COMPONENTS
 import { HomeComponent } from './home.component';
import { AuthGuard } from 'app/users';


const HOMEROUTES: Routes = [
     { path: 'home', canActivate: [AuthGuard], component: HomeComponent, data: { title : 'Home' } }];

export const HOME_ROUTES = RouterModule.forChild(HOMEROUTES);
