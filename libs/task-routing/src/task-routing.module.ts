import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  TaskAddComponent,
  TaskDetailComponent,
  TaskEditComponent,
  TasksListComponent
} from '@labdat/task/components';
import { TaskGuardService } from './services/task.guard.service';

const tasksRoutes: Routes = [
  {
    path: '',
    component: TasksListComponent,
    data: {
      page: 'list'
    },
    children: [
      {
        path: 'add',
        component: TaskAddComponent,
        pathMatch: 'full'
      },
      {
        path: ':id/edit',
        component: TaskEditComponent,
        pathMatch: 'full'
      }
    ]
//    canDeactivate: [TaskGuardService]
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

@NgModule({
  imports: [RouterModule.forChild(tasksRoutes)]
})
export class RootTaskRoutingModule {}

@NgModule()
export class TaskRoutingModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: TaskRoutingModule,
      providers: [ TaskGuardService ]
    };
  }
}
