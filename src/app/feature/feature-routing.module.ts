import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureGuard } from './services';
import { FeatureComponent } from './components/feature';

const featureRoutes: Routes = [{
  path: '',
  component: FeatureComponent,
  data: {
    expectedRoles: ['user', 'admin']
  },
  canActivate: [ FeatureGuard ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(featureRoutes)
  ],
  providers: [ FeatureGuard ]  
})
export class FeatureRoutingModule { }
