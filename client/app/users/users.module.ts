import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL DESIGN MODULES
import { MatTabsModule, MatCardModule, MatToolbarModule,
   MatInputModule, MatButtonModule } from '@angular/material';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {XHRBackend, Http, RequestOptions} from '@angular/http';

// LOGIN COMPONENTS
import { LoginComponent, RegisterComponent, SettingsComponent, ProfileComponent,
   PasswordComponent, UsersListComponent, EqualValidator} from './components';

// LOGIN ROUTES
import { UsersRoutingModule } from './users-routing.module';

// LOGIN SERVICES
import { UsersService, AuthGuard } from './services';
import { UsersConfig } from './users.config';

export function usersFactory(config: UsersConfig) {
  return () => config.addMenu() ;
}

@NgModule({
  imports: [
    UsersRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    ProfileComponent,
    PasswordComponent,
    EqualValidator,
    UsersListComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ UsersConfig, UsersService,
    { provide: APP_INITIALIZER, useFactory: usersFactory, deps: [UsersConfig], multi: true }
  ]
})
export class UsersModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UsersModule,
      providers: [AuthGuard]
    };
  }

}
