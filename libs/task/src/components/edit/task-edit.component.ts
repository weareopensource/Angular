import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditDialogComponent } from './task-edit.dialog.component';
import { fromTask, selectCurrentTask, TaskState } from '@labdat/task-state';
import { Store } from '@ngrx/store';
import { fromRouter } from '@labdat/router-state';
import { Task } from '@labdat/data-models';
import { first } from 'rxjs/operators/first';
import { Subscription } from 'rxjs/Subscription';
import { delay } from 'rxjs/operators/delay';
import { cloneDeep } from 'lodash';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';

@Component({
  selector: 'app-task-edit',
  template: ''
})
export class TaskEditComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;

  constructor(public dialog: MatDialog, private store: Store<TaskState>) { }

  ngOnInit(): void {
    const dialogSubscription = this.store.select(selectCurrentTask)
    .pipe(
      first(),
      delay(0),
      map(task => this.dialog.open(TaskEditDialogComponent, {
        width: '700px',
        data: { task: cloneDeep(task) }
      })),
      switchMap(dialogRef => dialogRef.afterClosed())
    )
    .subscribe((taskModel: Task) => {
      if (taskModel) {
        this.store.dispatch(new fromTask.Update({ task: { id: taskModel.id, changes: taskModel } }));
      }
      this.store.dispatch(new fromRouter.Back());
    });
    this.subscriptions = dialogSubscription;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
