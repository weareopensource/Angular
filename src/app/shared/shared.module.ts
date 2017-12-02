import { Mean2Sidenav, Mean2DrawerContainer, Mean2Drawer, Mean2SidenavContainer, Mean2DrawerContent, Mean2SidenavContent } from './components';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import {
  AppSelectors,
  AuthenticationGuard,
  AuthenticationSelectors,
  CoreSelectors
} from './services';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects, authenticationReducers } from './store/authentication';
import { coreReducer } from './store/core';


const COMPONENTS = [
  Mean2DrawerContainer,
  Mean2Drawer,
  Mean2DrawerContent,
  Mean2SidenavContainer,
  Mean2Sidenav,
  Mean2SidenavContent
];

const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule
];

const PROVIDERS = [
  AppSelectors,
  AuthenticationGuard,
  AuthenticationSelectors,
  CoreSelectors
];

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: RootSharedModule,
      providers: PROVIDERS
    };
  }
}

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('authentication', authenticationReducers),
    EffectsModule.forFeature([ AuthenticationEffects ]),        
    StoreModule.forFeature('core', coreReducer),
  ]
})
export class RootSharedModule { }