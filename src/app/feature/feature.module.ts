import { FeatureComponent } from './components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeatureRoutingModule } from './feature-routing.module';
import { featureConfiguration } from './configuration';

const COMPONENTS = [
  FeatureComponent
];

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class FeatureModule { }

// For lazy loading only
@NgModule({
  imports: [
    FeatureModule,
    FeatureRoutingModule//.withRoles(featureConfiguration.feature.roles)
  ],
  providers: []
})
export class RootFeatureModule { }
