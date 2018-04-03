import { TaskDeleteDialogComponent } from '../delete/task-delete.dialog.component';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { routesAnimation } from '@labdat/animations';
import { fromTask, selectAllTasks, TaskState } from '@labdat/task-state';
import { fromRouter } from '@labdat/router-state';
import { Store } from '@ngrx/store';
import { Task } from '@labdat/data-models';
import 'rxjs/add/operator/do';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-tasks-list',
  styleUrls: ['./task-list.component.scss'],
  templateUrl: './task-list.component.html',
  animations: [routesAnimation]
})
export class TasksListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public delete$ = new Subject();
  public view$ = new Subject();
  public edit$ = new Subject();
  public add$ = new Subject();

  public displayedColumns = ['id', 'title', 'action'];
  public dataSource: MatTableDataSource<Task>;

  private subscriptions: Subscription;

  constructor(public dialog: MatDialog, private store: Store<TaskState>) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    const allTasksSubscriptions = this.store
    .select(selectAllTasks)
    .subscribe(tasks => (this.dataSource.data = tasks));
    this.subscriptions = allTasksSubscriptions;

    this.view$
    .subscribe(taskId => this.store.dispatch(new fromRouter.Go({ path: ['tasks', taskId] })));

    this.delete$
    .pipe(
      map(taskId => this.dialog.open(
        TaskDeleteDialogComponent,
        {
          width: '250px',
          data: { taskId }
        })
      ),
      switchMap(dialogRef => dialogRef.afterClosed())
    )
    .subscribe(taskId => this.store.dispatch(new fromTask.Delete({ taskId })));

    this.edit$
    .subscribe(taskId => this.store.dispatch(new fromRouter.Go({path: ['tasks', Number(taskId), 'edit']})));
      //    this.store.dispatch(new fromRouter.Go({ path: ['/', 'tasks', id] }))

    this.add$
    .subscribe(_x => this.store.dispatch(new fromRouter.Go({ path: ['tasks', 'add'] })));
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
