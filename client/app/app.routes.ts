import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { Auth } from './users';
import { HomeComponent } from './home';

const ROUTES: Routes = [
     { path: 'home', component: HomeComponent, data : { title : 'Home' }},
     { path: 'user', loadChildren: 'app/users/users.module#UsersModule'},
     { path: 'list-articles', loadChildren: 'app/articles/articles.module#ArticlesModule' },
     // otherwise redirect to home
     { path: '**', redirectTo: 'home' , pathMatch: 'full'}
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);
