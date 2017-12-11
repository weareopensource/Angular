import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommandDetailComponent } from 'app/command/components/detail/detail.component';
import { CommandsListComponent } from 'app/command/components/list/list.component';
import { AuthenticationGuardService } from 'app/authentication';
import { commandConfiguration } from 'app/command/command.configuration';
import { isEmpty } from 'lodash';

export const commandRoutes: Routes = [{
  path: '',
  component: CommandsListComponent,
  children: [{
    path: ':id',
    component: CommandDetailComponent,
    data: { state: 'detail' }
  }],
}];

if (!isEmpty(commandConfiguration.self.roles)) {
  Object.assign(commandRoutes[0], {
    data: {
      expectedRoles: commandConfiguration.self.roles
    }
  });
}

@NgModule({
  imports: [
    RouterModule.forChild(commandRoutes)
  ]
})
export class CommandRoutingModule { }
