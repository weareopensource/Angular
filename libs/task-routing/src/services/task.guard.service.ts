import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { filter } from 'rxjs/operators/filter';
import { tap } from 'rxjs/operators/tap';
import { first } from 'rxjs/operators/first';
import { fromTask, selectTaskLoaded } from '@labdat/task-state';
import { delay } from 'rxjs/operators/delay';

@Injectable()
export class TaskGuardService implements CanActivate, CanDeactivate<any> {
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

  canDeactivate(_comp): Observable<boolean> | boolean {
    return of(true)
    .pipe(delay(3000));
  }
}
