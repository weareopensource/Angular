import { FeatureComponent } from './components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeatureRoutingModule } from './feature-routing.module';
import { featureConfiguration } from './configuration';
import { MatCardModule } from '@angular/material';

const COMPONENTS = [
  FeatureComponent
];

const MATERIAL_MODULES = [
  MatCardModule
];

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL_MODULES
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class FeatureModule { }

@NgModule({
  imports: [
    FeatureModule,
    FeatureRoutingModule//.withRoles(featureConfiguration.feature.roles)
  ],
  providers: []
})
export class RootFeatureModule { }
