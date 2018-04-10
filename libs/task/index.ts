export { TaskViewModule } from './src/task-view.module';
export { taskConfiguration } from './src/task.configuration';
export { TaskRoutingModule } from './src/task-routing.module';
export { TaskGuardService } from './src/services/task.guard.service';
export { TaskStateModule } from './src/task-state.module';
export {
  selectTaskIds,
  selectTaskEntities,
  selectAllTasks,
  selectTaskTotal,
  selectCurrentTask,
  selectTaskLoading,
  selectTaskLoaded
} from './src/+state/task.selectors';
export { TaskState } from './src/+state/task.interfaces';
import * as fromTask from './src/+state/task.actions';
export { fromTask };
export { TaskDetailComponent } from './src/components/detail/task-detail.component';
export { TasksListComponent } from './src/components/list/task-list.component';
export { TaskAddComponent } from './src/components/add/task-add.component';
export { TaskAddDialogComponent } from './src/components/add/task-add.dialog.component';
export { TaskEditComponent } from './src/components/edit/task-edit.component';
export { RoutingTaskModule } from './src/routing-task.module';
