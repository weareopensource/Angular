import { NgModule } from '@angular/core';
import { AdministrationViewModule } from './administration-view.module';
import { AdministrationRoutingModule } from './administration-routing.module';

@NgModule({
  imports: [ AdministrationViewModule, AdministrationRoutingModule ]
})
export class RoutingAdministrationModule {

}
