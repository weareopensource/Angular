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
