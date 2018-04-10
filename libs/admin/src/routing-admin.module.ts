import { NgModule } from '@angular/core';
import { AdminViewModule } from './admin-view.module';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [ AdminViewModule, AdminRoutingModule ]
})
export class RoutingAdminModule {

}
