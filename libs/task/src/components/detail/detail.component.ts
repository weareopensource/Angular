import { ActivatedRoute, Router } from '@angular/router';
import { Inject, Component, OnInit, HostBinding } from '@angular/core';
import { fromRouter } from '@labdat/router-state';
import { Store } from '@ngrx/store';
import { selectCurrentTask } from '@labdat/task-state';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-task-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
  })
  export class TaskDetailComponent implements OnInit {

    public comments$: Observable<any[]>;

    constructor(private route: ActivatedRoute, private store: Store<any>) { }

    ngOnInit(): void {
      this.comments$ = this.store.select(selectCurrentTask).map(task => task.comments)
    }

    close() {
      this.store.dispatch(new fromRouter.Back());
    }
  }
