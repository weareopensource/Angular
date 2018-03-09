import { selectAllTasks, TaskState } from '@labdat/task-state';
import { TaskDeleteDialog } from '../delete/delete.dialog';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { routesAnimation } from '@labdat/animations';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromRouter } from '@labdat/router-state';
import { Store } from '@ngrx/store';
import { Task } from '@labdat/data-models';
import 'rxjs/add/operator/do';
import { Subscription } from 'rxjs/Subscription';
import { TaskEditComponent } from '../edit/edit.component';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-tasks-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html',
  animations: [routesAnimation]
})
export class TasksListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = ['id', 'title', 'action'];
  public dataSource: MatTableDataSource<Task>;

  private subscriptions: Subscription;

  constructor(public dialog: MatDialog, private store: Store<TaskState>) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.subscriptions = this.store
      .select(selectAllTasks)
      .do(console.log)
      .subscribe(tasks => (this.dataSource.data = tasks));
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

  delete(): void {
    const dialogRef = this.dialog
    .open(TaskDeleteDialog, { width: '250px' });

    dialogRef
    .afterClosed()
    .subscribe(() => console.log('The dialog was closed'));
  }

  edit(): void {
    const dialogRef = this.dialog.open(TaskEditComponent, {
      width: '700px',
      data: {}
    });

    dialogRef
    .afterClosed()
    .subscribe(() => {
      console.log('The dialog was closed');
    });

    //    this.store.dispatch(new fromRouter.Go({ path: ['/', 'tasks', id] }))
  }

  view(id): void {
    this.store.dispatch(new fromRouter.Go({ path: ['/', 'tasks', id] }));
  }

  add(): void {
    this.store.dispatch(new fromRouter.Go({ path: ['tasks', 'add'] }));
  }

  getState(outlet): any {
    return outlet.activatedRouteData.state;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
