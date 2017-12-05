import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureGuard } from './services';
import { FeatureComponent } from './components/feature';
import { featureConfiguration } from './configuration';

const featureRoutes: Routes = [{
  path: '',
  data: {
    expectedRoles: featureConfiguration.self.roles
  },
  component: FeatureComponent,
  canActivate: [ FeatureGuard ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(featureRoutes)
  ],
  providers: [ FeatureGuard ]
})
export class FeatureRoutingModule {}
