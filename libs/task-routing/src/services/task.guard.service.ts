import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators/filter';
import { tap } from 'rxjs/operators/tap';
import { first } from 'rxjs/operators/first';
import { selectTaskLoaded, fromTask } from '@labdat/task-state';

@Injectable()
export class TaskGuardService implements CanActivate {
  constructor(private store: Store<any>) { }

  canActivate(): Observable<boolean> | boolean {
    return this.store
    .select(selectTaskLoaded)
    .pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromTask.Load());
        }
      }),
      filter(loaded => loaded),
      first()
    );
  }
}
