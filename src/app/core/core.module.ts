import { HttpModule } from '@angular/http';
import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent, HomeComponent, NotFoundComponent } from './components';
import { CoreRoutingModule } from './core-routing.module';
import {
  MatButtonModule,
  MatTooltipModule,
  MatToolbarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatListModule
 } from '@angular/material';
import { SharedModule } from 'app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthenticationModule } from 'app/authentication/authentication.module';
import { Store, StoreModule } from '@ngrx/store';
import { coreReducers } from './store';
import { MenuItem } from './models';
import { APP_INITIALIZER } from '@angular/core';
import { CoreInitialisation, CoreSelectors } from './services';

const CORE_CONFIGURATION = new InjectionToken('CORE_CONFIGURATION');

export const COMPONENTS = [
  AppComponent,
  HomeComponent,
  NotFoundComponent
];

const MATERIAL_MODULES = [
  MatButtonModule,
  MatTooltipModule,
  MatToolbarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatListModule
 ];
 
function initialisationFactory(coreConfiguration, configuration) {
  return () => coreConfiguration.addMenuItem(configuration) ;
}

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    ...MATERIAL_MODULES,
    FlexLayoutModule,
    CoreRoutingModule,
    AuthenticationModule,
    SharedModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot(configuration: MenuItem[]) {
    return {
      ngModule: RootCoreModule,
      providers: [
        CoreInitialisation,
        CoreSelectors,
        { provide: CORE_CONFIGURATION, useValue: configuration },        
        { provide: APP_INITIALIZER, useFactory: initialisationFactory, deps: [CoreInitialisation, CORE_CONFIGURATION], multi: true }
      ]
    };
  }
}

@NgModule({
  imports: [
    CoreModule,
    CoreRoutingModule,
    StoreModule.forFeature('core', coreReducers)
  ]
})
export class RootCoreModule { }
