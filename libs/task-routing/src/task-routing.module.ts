import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskDetailComponent, TasksAddComponent, TasksListComponent } from '@labdat/task/components';
import { TaskGuardService } from './services/task.guard.service';

const tasksRoutes: Routes = [
  {
    path: 'list',
    component: TasksListComponent,
    data: {
      page: 'list'
    }
  },
  {
    path: 'add',
    component: TasksAddComponent,
    data: {
      page: 'add'
    }
  },
  {
    path: ':id',
    component: TaskDetailComponent,
    data: {
      page: 'detail'
    }
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];
/*
if (!isEmpty(taskConfiguration.self.roles)) {
  Object.assign(tasksRoutes[0], {
    data: {
      expectedRoles: taskConfiguration.self.roles
    }
  });
}
*/

@NgModule()
export class RootTaskRoutingModule {}

@NgModule({
  imports: [RouterModule.forChild(tasksRoutes)]
})
export class TaskRoutingModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootTaskRoutingModule,
      providers: [TaskGuardService]
    };
  }
}
