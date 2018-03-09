import { NgModule, APP_INITIALIZER } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TaskInitializationService } from './+state/task.initialization';
import { taskReducer } from './+state/task.reducer';
import { TaskEffects } from './+state/task.effects';
import { TaskApiService } from './services/task.api.service';

export function taskInitialisationFactory(taskInitialization) {
  return () => taskInitialization.loadTasks();
}

@NgModule({
  imports: [StoreModule.forFeature('task', taskReducer), EffectsModule.forFeature([TaskEffects])],
  providers: [
    TaskInitializationService,
    TaskApiService,
    { provide: APP_INITIALIZER, useFactory: taskInitialisationFactory, deps: [TaskInitializationService], multi: true }
  ]
})
export class RootTaskStateModule {}

@NgModule({})
export class TaskStateModule {
  public static forRoot() {
    return {
      ngModule: RootTaskStateModule,
      providers: [
        TaskInitializationService,
        TaskApiService,
        {
          provide: APP_INITIALIZER,
          useFactory: taskInitialisationFactory,
          deps: [TaskInitializationService],
          multi: true
        }
      ]
    };
  }
}
