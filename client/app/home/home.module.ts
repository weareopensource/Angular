import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL DESIGN MODULES
import { HOME_ROUTES } from './home.route';

// HOME COMPONENT
import { HomeComponent } from './home.component';
import { HomeConfig } from './home.config';

export function homeFactory(config: HomeConfig) {
  return () => config.addMenu() ;
}

@NgModule({
  imports: [
    HOME_ROUTES,
    CommonModule
  ],
  declarations: [
    HomeComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ HomeConfig,
  { provide: APP_INITIALIZER, useFactory: homeFactory, deps: [HomeConfig], multi: true }
],

})
export class HomeModule {}
