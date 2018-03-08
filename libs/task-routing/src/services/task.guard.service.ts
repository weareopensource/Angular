import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators/filter';
import { take } from 'rxjs/operators/take';
import { selectTaskLoaded } from '@labdat/task-state';

@Injectable()
export class TaskGuardService implements CanActivate {
  constructor(private store: Store<any>) {}

  canActivate(): Observable<boolean> | boolean {
    return this.store.select(selectTaskLoaded).pipe(filter(loaded => loaded),take(1));
  }
}
