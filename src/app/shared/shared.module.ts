import {
  Mean2Sidenav,
  Mean2DrawerContainer,
  Mean2Drawer,
  Mean2SidenavContainer,
  Mean2DrawerContent,
  Mean2SidenavContent } from './components';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FeatureShared } from 'app/feature/services';

const COMPONENTS = [
  Mean2DrawerContainer,
  Mean2Drawer,
  Mean2DrawerContent,
  Mean2SidenavContainer,
  Mean2Sidenav,
  Mean2SidenavContent
];

const MATERIAL_MODULES = [
  MatIconModule,
  MatTooltipModule
];

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        FeatureShared
      ]
    }
  }
}
