import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PocdataststComponent } from '@labdat/pocdatastst/pocdatastst.components';

const pocdataststRoutes: Routes = [{
  path: '',
  component: PocdataststComponent,
}];

@NgModule({
  imports: [
    RouterModule.forChild(pocdataststRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PocdataststRoutingModule { }
