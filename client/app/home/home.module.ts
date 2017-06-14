import { NgModule,CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL DESIGN MODULES
import { MaterialModule, OverlayContainer } from '@angular/material';
import { HOME_ROUTES } from './index';

// HOME COMPONENT
import { HomeComponent } from './index';
import { HomeConfig } from './index';

export function homeFactory(config: HomeConfig) {
  return () => config.addMenu() ;
}

@NgModule({
  imports: [
    HOME_ROUTES,
    MaterialModule,
    CommonModule
  ],
  declarations: [
    HomeComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ HomeConfig, OverlayContainer,
  { provide: APP_INITIALIZER, useFactory: homeFactory, deps: [HomeConfig], multi: true }
],

})
export class HomeModule {}
