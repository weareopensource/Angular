import { RouterModule, Routes } from '@angular/router';

// USERS COMPONENTS
import { LoginComponent, RegisterComponent, SettingsComponent, UsersListComponent } from '.';

// AUTH SERVICE
import { AuthGuard } from './services';

const USERSROUTES: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'register', component: RegisterComponent, canActivateChild: [AuthGuard], data: { title: 'Register' } },
  {
    path: 'settings/profile', component: SettingsComponent, canActivateChild: [AuthGuard], data: {
      roles: ['user', 'admin'],
      title: 'Settings / Profile'
    }
  },
  {
    path: 'list-users', component: UsersListComponent, canActivateChild: [AuthGuard],
    data: {
      roles: ['admin'],
      title: 'Users List'
    }
  }];

export const USERS_ROUTES = RouterModule.forChild(USERSROUTES);
