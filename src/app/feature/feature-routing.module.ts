import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './components';

const featureRoutes: Routes = [{
  path: '',
  component: FeatureComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(featureRoutes)
  ]
})
export class FeatureRoutingModule { }
