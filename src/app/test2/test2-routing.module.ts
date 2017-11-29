import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components';

const authRoutes: Routes = [{
  path: '',
  component: TestComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ]
})
export class Test2RoutingModule {}
