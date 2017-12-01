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
  AppStore,
  AuthenticationGuard,
  AuthenticationStore,
  CoreStore
} from './services';


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
  AppStore,
  AuthenticationGuard,
  AuthenticationStore,
  CoreStore
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
      ngModule: SharedModule,
      providers: PROVIDERS
    };
  }
}

