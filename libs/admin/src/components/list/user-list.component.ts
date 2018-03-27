import { UserDeleteDialogComponent } from '../delete/user-delete.dialog.component';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { routesAnimation } from '@labdat/animations';
import { fromUser, selectAllUsers, UserState } from '@labdat/user-state';
import { fromRouter } from '@labdat/router-state';
import { Store } from '@ngrx/store';
import { User } from '@labdat/data-models';
import 'rxjs/add/operator/do';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-users-list',
  styleUrls: ['./user-list.component.scss'],
  templateUrl: './user-list.component.html',
  animations: [routesAnimation]
})
export class UsersListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public delete$ = new Subject();
  public view$ = new Subject();
  public edit$ = new Subject();
  public add$ = new Subject();

  public displayedColumns = ['id', 'firstName', 'lastName', 'userName', 'email', 'action'];
  public dataSource: MatTableDataSource<User>;

  private subscriptions: Subscription;

  constructor(public dialog: MatDialog, private store: Store<UserState>) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    const allUsersSubscriptions = this.store
    .select(selectAllUsers)
    .subscribe(users => (this.dataSource.data = users));
    this.subscriptions = allUsersSubscriptions;

    this.view$
    .subscribe(userId => this.store.dispatch(new fromRouter.Go({ path: ['admin', 'users', userId] })));

    this.delete$
    .pipe(
      map(userId => this.dialog.open(
        UserDeleteDialogComponent,
        {
          width: '250px',
          data: { userId }
        })
      ),
      switchMap(dialogRef => dialogRef.afterClosed())
    )
    .subscribe(userId => this.store.dispatch(new fromUser.Delete({ userId })));

    this.edit$
    .subscribe(userId => this.store.dispatch(new fromRouter.Go({path: ['admin', 'users', Number(userId), 'edit']})));
      //    this.store.dispatch(new fromRouter.Go({ path: ['/', 'users', id] }))

    this.add$
    .subscribe(_x => this.store.dispatch(new fromRouter.Go({ path: ['admin', 'users', 'add'] })));
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getState(outlet): any {
    return outlet.activatedRouteData.state;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
