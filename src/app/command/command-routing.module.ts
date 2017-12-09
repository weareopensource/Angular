import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommandDetailComponent } from './components/detail/detail.component';
import { CommandsListComponent } from './components/list/list.component';
import { AuthenticationGuardService } from 'app/authentication';
import { commandConfiguration } from './configuration/command.configuration';
import { isEmpty } from 'lodash';

const commandsRoutes: Routes = [{
  path: '',
  component: CommandsListComponent,
  children: [{
    path: ':id',
    component: CommandDetailComponent,
    data: { state: 'detail' }
  }],
}];

if (!isEmpty(commandConfiguration.self.roles)) {
  Object.assign(commandsRoutes[0], {
    data: {
      expectedRoles: commandConfiguration.self.roles
    }
  });
}

@NgModule({
  imports: [
    RouterModule.forChild(commandsRoutes)
  ]
})
export class CommandRoutingModule { }
