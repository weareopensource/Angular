import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Command } from '../models';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandState, CommandSelectors } from '../store';
import { Store } from '@ngrx/store';

@Injectable()
export class CommandDatabase {
  dataChange: BehaviorSubject<Command[]> = new BehaviorSubject<Command[]>([]);
  get data(): Command[] { return this.dataChange.value; }

  constructor(private store: Store<CommandState>, private commandSelectors: CommandSelectors) {
    this.store.select(this.commandSelectors.getHandledCommands)
    .subscribe((commands) => {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', commands)
      this.dataChange.next(commands);
    });
  }
}
