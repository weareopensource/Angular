import { Injectable, Inject } from "@angular/core";
import * as fromTask from "./task.actions";
import { TaskState } from "./task.interfaces";
import { Store } from "@ngrx/store";
import { getLoggedIn } from "@labdat/authentication-state";
import { Observable } from "rxjs/Observable";
import { first } from "rxjs/operators/first";

@Injectable()
export class TaskInitializationService {
  constructor(private store: Store<TaskState>) { }

  public loadTasks() {
    this.store.select(getLoggedIn)
    .pipe(
      first()
    )
    .subscribe(loggedIn => {
      if (loggedIn) {
        this.store.dispatch(new fromTask.Load());
      }
    });
  }
}
