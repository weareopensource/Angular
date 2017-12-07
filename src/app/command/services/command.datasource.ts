import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CommandDatabase } from './command.database';
import { MatSort, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Command } from '../models';



/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */

export class CommandDatasource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _database: CommandDatabase, private _sort: MatSort, private _paginator: MatPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Command[]> {
    const displayDataChanges = [
      this._database.dataChange,
      this._filterChange,
      this._sort.sortChange,
      this._paginator.page
    ];

    return Observable.merge(...displayDataChanges).map((e) => {
      let data = this._database.data.slice();
      data = data.filter((item: Command) => {
        const searchStr = (item.title).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

//      if (!this._sort.active || this._sort.direction === '') { return data; }

/*
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly createdDate: Date;
  readonly updatedDate: Date;
  readonly userIds: number[];
*/

      data = data.sort((a, b) => {
        let propertyA: number|string = '';
        let propertyB: number|string = '';

        switch (this._sort.active) {
          case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
          case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
        }

        const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
        const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

        return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
      });
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      data = data.splice(startIndex, this._paginator.pageSize);

      return data;
    });
  }

  disconnect() {}

  getSortedData(): Command[] {
    const data = this._database.data.slice();
    if (!this._sort.active || this._sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
