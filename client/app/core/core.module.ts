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
  MatSidenavModule,
  MatListModule
 } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/core.reducer'

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
  MatSidenavModule,
  MatListModule
 ];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    ...MATERIAL_MODULES,
    CoreRoutingModule
  ],
  declarations: COMPONENTS
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: RootCoreModule
    };
  }
}

@NgModule({
  imports: [
    CoreModule,
    CoreRoutingModule,
    StoreModule.forFeature('core', reducer)
  ],
})
export class RootCoreModule { }