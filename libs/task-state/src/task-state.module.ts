import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TaskInitializationService } from './+state/task.initialization';
import { taskReducer } from './+state/task.reducer';
import { TaskEffects } from './+state/task.effects';
import { TaskApiService } from './services/task.api.service';
import { TaskSnackComponent } from './components/task-snack/task-snack.component';

export function taskInitialisationFactory(taskInitialization): any {
  return () => taskInitialization.loadTasks();
}

@NgModule({
  declarations: [ TaskSnackComponent ],
  exports: [ TaskSnackComponent ],
  entryComponents: [ TaskSnackComponent ],
  imports: [
    StoreModule.forFeature('task', taskReducer),
    EffectsModule.forFeature([TaskEffects])
  ],
  providers: [
    TaskInitializationService,
    TaskApiService,
    { provide: APP_INITIALIZER, useFactory: taskInitialisationFactory, deps: [TaskInitializationService], multi: true }
  ]
})
export class RootTaskStateModule { }

@NgModule()
export class TaskStateModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootTaskStateModule,
      providers: [
        TaskInitializationService,
        TaskApiService,
        {
          provide: APP_INITIALIZER,
          useFactory: taskInitialisationFactory,
          deps: [ TaskInitializationService ],
          multi: true
        }
      ]
    };
  }
}
