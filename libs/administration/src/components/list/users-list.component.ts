import { UserDeleteDialogComponent } from '../delete/user-delete.dialog.component';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import * as fromUser from '../../+state/user.actions';
import { UserState } from '../../+state/user.interfaces';
import { selectAllUsers } from '../../+state/user.selectors';
import { fromRouter } from '@labdat/common/router-state';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { filter } from 'rxjs/operators/filter';

@Component({
  styleUrls: ['./users-list.component.scss'],
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public delete$ = new Subject();
  public view$ = new Subject();
  public add$ = new Subject();

  public displayedColumns = ['_id', 'firstName', 'lastName', 'username', 'email', 'action'];
  public dataSource: MatTableDataSource<User>;

  private subscriptions: Subscription;

  constructor(public _dialog: MatDialog, private _store: Store<UserState>) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    const allUsersSubscriptions = this._store
    .select(selectAllUsers)
    .subscribe(users => (this.dataSource.data = users));
    this.subscriptions = allUsersSubscriptions;

    const viewSubscription = this.view$
    .subscribe(userId => this._store.dispatch(new fromRouter.Go({ path: ['admin', 'users', userId] })));
    this.subscriptions.add(viewSubscription);

    const deleteSubscription = this.delete$
    .pipe(
      map(userId => this._dialog.open(
        UserDeleteDialogComponent,
        {
          width: '250px',
          data: { userId }
        })
      ),
      switchMap(dialogRef => dialogRef.afterClosed()),
      filter(userId => userId)
    )
    .subscribe(userId => this._store.dispatch(new fromUser.Delete({ userId })));
    this.subscriptions.add(deleteSubscription);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getState(outlet): any {
    return outlet.activatedRouteData.state;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
