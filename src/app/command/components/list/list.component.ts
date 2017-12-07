import { CommandDetailComponent } from '../detail';
import { CommandDeleteDialog } from '../delete';
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
import { routerTransition } from 'app/shared/animations';
import { CommandDatasource } from '../../models';
import { Store } from '@ngrx/store';
import { CommandSelectors, CommandState } from '../../store';
import { values } from 'lodash';
/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-commands-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html',
  animations: [ routerTransition ]
})
export class CommandsListComponent implements OnInit {
  public displayedColumns = ['id', 'title', 'action'];
  public dataSource: CommandDatasource | null;
  public database$ = this.store.select(this.commandSelectors.getHandledCommands);
  public dataLength$ = this.database$.map(commands => commands.length);
  
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private store: Store<CommandState>,
    private commandSelectors: CommandSelectors) { }

  ngOnInit() {
    this.dataSource = new CommandDatasource(this.database$, this.sort, this.paginator);
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
    const dialogRef = this.dialog.open(CommandDeleteDialog, { width: '250px' });
    dialogRef.afterClosed().subscribe(result => console.log('The dialog was closed'));
  }

  edit(id): void {
//    const dialogRef = this.dialog.open(CommandDetailComponent, {
//      width: '700px',
//      data: { }
//    });

//    dialogRef.afterClosed().subscribe(result => {
//      console.log('The dialog was closed');
//    });

    this.router.navigate(['/', 'command', id]);
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

}



