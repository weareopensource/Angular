import { RouterModule, Routes } from '@angular/router';

// USERS COMPONENTS
import { LoginComponent, RegisterComponent, SettingsComponent, UsersListComponent } from '.';

// AUTH SERVICE
import { Auth } from './services/auth.service';

const USERSROUTES: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'register', component: RegisterComponent, canActivateChild: [Auth], data: { title: 'Register' } },
  {
    path: 'settings/profile', component: SettingsComponent, canActivateChild: [Auth], data: {
      roles: ['user', 'admin'],
      title: 'Settings / Profile'
    }
  },
  {
    path: 'list-users', component: UsersListComponent, canActivateChild: [Auth],
    data: {
      roles: ['admin'],
      title: 'Users List'
    }
  }];

export const USERS_ROUTES = RouterModule.forChild(USERSROUTES);
