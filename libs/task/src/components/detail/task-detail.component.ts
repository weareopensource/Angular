import { Component } from '@angular/core';
import { fromRouter } from '@labdat/router-state';
import { Store } from '@ngrx/store';
import { selectCurrentTask } from '@labdat/task-state';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {
  public comments$: Observable<Array<any>>;

  constructor(private store: Store<any>) {}
  public currentTask$ = this.store.select(selectCurrentTask);

  back(): void {
    this.store.dispatch(new fromRouter.Back());
  }
}
