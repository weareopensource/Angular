import { TaskDetailComponent } from '../detail/detail.component';
import { TaskDeleteDialog } from '../delete/delete.dialog';
import { Component, ElementRef, ViewChild, Inject, OnInit, HostBinding, AfterViewInit, Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { startWith } from 'rxjs/operators/startWith';
import { merge } from 'rxjs/operators/merge';
import { map } from 'rxjs/operators/map';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { fromEvent } from 'rxjs/observable/fromEvent';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { routesAnimation } from '@labdat/animations';
import { TaskState, selectAllTasks } from '@labdat/task-state';
import { fromRouter } from '@labdat/router-state';
import { Store } from '@ngrx/store';
import { Task } from '@labdat/data-models';
import { tap } from 'rxjs/operators/tap';
import 'rxjs/add/operator/do';
import { Subscription } from 'rxjs/Subscription';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-tasks-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html',
  animations: [ routesAnimation ]
})
export class TasksListComponent implements OnInit {

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  public displayedColumns = ['id', 'title', 'action'];
  public dataSource: MatTableDataSource<Task>;

  private subscriptions: Subscription;

  constructor(
    public dialog: MatDialog,
    private store: Store<TaskState>
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.subscriptions = this.store.select(selectAllTasks).do(console.log)
    .subscribe(tasks => this.dataSource.data = tasks);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  delete(): void {
    const dialogRef = this.dialog.open(TaskDeleteDialog, { width: '250px' });
    dialogRef.afterClosed().subscribe(result => console.log('The dialog was closed'));
  }

  edit(id): void {
//    const dialogRef = this.dialog.open(TaskDetailComponent, {
//      width: '700px',
//      data: { }
//    });

//    dialogRef.afterClosed().subscribe(result => {
//      console.log('The dialog was closed');
//    });

    this.store.dispatch(new fromRouter.Go({ path: ['/', 'tasks', id] }))
  }

  add(): void {
    this.store.dispatch(new fromRouter.Go({ path: ['tasks', 'add'] }))
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  ngOnDestroy() {
    console.log('not now');
    this.subscriptions.unsubscribe();
  }
}
