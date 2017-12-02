import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './components';
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
  FeatureComponent
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
})
export class FeatureModule { }

@NgModule({
  imports: [
    FeatureModule,
    FeatureRoutingModule
  ]
})
export class RootFeatureModule { }
