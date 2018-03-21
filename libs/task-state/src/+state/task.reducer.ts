import * as fromTask from './task.actions';
import { taskAdapter, TaskState } from './task.interfaces';
import { fromAuthentication } from '@labdat/authentication-state';

export const taskInitialState: TaskState = taskAdapter.getInitialState({
  loading: false,
  loaded: false
});
export function taskReducer(
  state: TaskState = taskInitialState,
  action: fromTask.Actions | fromAuthentication.Actions
): TaskState {
  switch (action.type) {
    case fromTask.LOAD: {
      return { ...state, loading: true };
    }
    case fromTask.LOAD_SUCCESS: {
      console.log('????');

      return taskAdapter.addAll(action.payload.tasks, { ...state, loading: false, loaded: true });
    }

    case fromAuthentication.LOGOUT: {
      //      return adapter.removeAll({ ...state, selectedUserId: null });
      return taskInitialState;
    } /*
    case task.HANDLE_SUCCESS: {
      return {
        tasks: {
          ...state.tasks,
          ...keyBy(action.payload.tasks, 'id'),
        }
      };
    }*/
    case fromTask.ADD_SUCCESS: {
      return taskAdapter.addOne(action.payload.task, state);
    }

    case fromTask.UPDATE_SUCCESS: {
      return taskAdapter.updateOne(action.payload.task, state);
    }

    case fromTask.DELETE_SUCCESS: {
      return taskAdapter.removeOne(action.payload.taskId, state);
    }

    case fromTask.DELETE_FAILURE: {
      return state;
    }

    default: {
      return state;
    }
  }
}
