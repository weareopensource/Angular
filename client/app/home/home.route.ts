import { RouterModule, Routes } from '@angular/router';
// APP COMPONENTS
 import { HomeComponent } from './index';


const HOMEROUTES: Routes = [
     { path: '', component: HomeComponent, data: { title : 'Home' } }];

export const HOME_ROUTES = RouterModule.forChild(HOMEROUTES);
