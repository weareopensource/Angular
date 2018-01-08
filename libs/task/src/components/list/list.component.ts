import { TaskDetailComponent } from '../detail/detail.component';
import { TaskDeleteDialog } from '../delete/delete.dialog';
import { Component, ElementRef, ViewChild, Inject, OnInit, HostBinding, AfterViewInit, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { routesAnimation } from '@labdat/animations';
import { TaskDatasource } from '../../models/task.datasource';
import { TaskState, selectAllTasks } from '@labdat/task-state';
import { fromRouter } from '@labdat/router-state';
import { Store } from '@ngrx/store';

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
  public displayedColumns = ['id', 'title', 'action'];
  public dataSource: TaskDatasource | null;
  public database$ = this.store.select(selectAllTasks);
  public dataLength$ = this.database$.map(tasks => tasks.length);

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private store: Store<TaskState>) { }

  ngOnInit() {
    this.dataSource = new TaskDatasource(this.database$, this.sort, this.paginator);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
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

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

}
