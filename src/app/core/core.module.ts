import { HttpModule } from '@angular/http';
import { NgModule, ModuleWithProviders } from '@angular/core';
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
import { StoreModule } from '@ngrx/store';
import { coreReducer } from './store';
import { CoreSelectors } from './services';

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
  static forRoot() {
    return {
      ngModule: RootCoreModule,
      providers: [ CoreSelectors ]
    };
  }
}

@NgModule({
  imports: [
    CoreModule,
    CoreRoutingModule,
    StoreModule.forFeature('core', coreReducer)
  ]
})
export class RootCoreModule { }