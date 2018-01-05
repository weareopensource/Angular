import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatSort, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/observable';
import { combineLatest } from "rxjs/operators/combineLatest";
import { merge } from "rxjs/operators/merge";
import { startWith } from "rxjs/operators/startWith";
import { map } from "rxjs/operators/map";
import { Article } from './article.model';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/combineLatest';

export class ArticleDatasource extends DataSource<any> {

  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }
  get startIndex() { return this._paginator.pageIndex * this._paginator.pageSize };

  constructor(private _database: Observable<Article[]>, private _sort: MatSort, private _paginator: MatPaginator) {
    super();
  }

  connect(): Observable<Article[]> {
    const displayDataChanges = [
      this._sort.sortChange.pipe(startWith({})),
      this._filterChange.pipe(startWith('')),
      this._paginator.page.pipe(startWith({}))
    ];
    return this._database.pipe(
      combineLatest(...displayDataChanges, (data: any) => data
        .filter(this.filterArticle)
        .sort(this.sortArticle)
        .splice(this.startIndex, this._paginator.pageSize)
      )
    );
  }

  filterArticle = (article: Article) => {
    const searchStr = (article.title).toLowerCase();
    return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
  }

  sortArticle = (a, b) => {
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
