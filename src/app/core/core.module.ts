import { HttpModule } from '@angular/http';
import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
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
import { AuthenticationModule } from 'app/authentication';
import { CoreRoutingModule } from 'app/core/+routing';
import { Store, StoreModule } from '@ngrx/store';

export const COMPONENTS = [
  LayoutComponent,
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
  public static forRoot() {
    return {
      ngModule: RootCoreModule,
    }
  }
}

@NgModule({
  imports: [
    CoreModule,
    CoreRoutingModule
  ]
})
export class RootCoreModule { }
