import { MatSidenav, MatDrawerContainer, MatDrawer, MatSidenavContainer, MatDrawerContent, MatSidenavContent } from './components';
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

const COMPONENTS = [
  MatDrawerContainer,
  MatDrawer,
  MatDrawerContent,
  MatSidenavContainer,
  MatSidenav,
  MatSidenavContent
];

const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule
];

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  declarations: [ ...COMPONENTS ],
  exports: [ ...COMPONENTS ],
})
export class SharedModule { }

