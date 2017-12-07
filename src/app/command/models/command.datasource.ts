import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatSort, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Command } from '../models';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-store.module';
import { CommandSelectors } from '../store';
import 'rxjs/add/operator/combineLatest';

export class CommandDatasource extends DataSource<any> {

  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }
  get startIndex() { return this._paginator.pageIndex * this._paginator.pageSize };
  
  constructor(private _database: Observable<Command[]>, private _sort: MatSort, private _paginator: MatPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any> {
    const displayDataChanges = [
      this._filterChange,
      this._sort.sortChange,
      this._paginator.page
    ];
    return Observable.combineLatest(
      this._database,      
      Observable.merge(...displayDataChanges),
      (data, e) => {
        return data.filter(this.filterCommand)
        .sort(this.sortCommand)
        .splice(this.startIndex, this._paginator.pageSize);
      });
  }

  filterCommand = (command: Command) => {
    const searchStr = (command.title).toLowerCase();
    return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
  }

  sortCommand = (a, b) => {
    let propertyA: number|string = '';
    let propertyB: number|string = '';

    switch (this._sort.active) {
      case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
      case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
    }

    const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
    const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

    return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
  }

  disconnect() {}
}
