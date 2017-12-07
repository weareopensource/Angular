import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FileDatabase } from './file.database';
import { MatSort, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileDataSource extends DataSource<any> {

  constructor(private _database: FileDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<File[]> {
    return this._database.dataChange.map((e) => {
      const data = this._database.data.slice();
      return data;
    });
  }

  disconnect() {}

}
