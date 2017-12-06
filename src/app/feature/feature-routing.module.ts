import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureGuard } from './services';
import { FeatureComponent } from './components/feature';
import { featureConfiguration } from './configuration';
import { isEmpty } from 'lodash';

const featureRoutes: Routes = [{
  path: '',
  component: FeatureComponent,
  canActivate: [ FeatureGuard ]
}];

if (!isEmpty(featureConfiguration.self.roles)) {
  Object.assign(featureRoutes[0], {
    data: {
      expectedRoles: featureConfiguration.self.roles
    },
    canActivate: [ FeatureGuard ]
  });
}

@NgModule({
  imports: [
    RouterModule.forChild(featureRoutes)
  ],
  providers: [ FeatureGuard ]
})
export class FeatureRoutingModule {}
