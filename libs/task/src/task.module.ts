import { TaskDeleteDialog } from './components/delete/delete.dialog';
import { TaskDetailComponent } from './components/detail/detail.component';
import { TasksListComponent } from './components/list/list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskRoutingModule } from '@labdat/task-routing';
import { HttpClientModule } from '@angular/common/http';

import {
  MatButtonModule,
  MatTooltipModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatListModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@labdat/shared';
import { ModuleWithProviders } from '@angular/core';

const COMPONENTS = [
  TasksListComponent,
  TaskDetailComponent,
  TaskDeleteDialog
];

const MATERIAL_MODULES = [
  MatButtonModule,
  MatTooltipModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatListModule
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    HttpClientModule,
    ...MATERIAL_MODULES,
    FlexLayoutModule,
    RouterModule,
    SharedModule
  ],
  entryComponents: [
    TaskDeleteDialog
  ]
})
export class TaskModule {}

@NgModule({
  imports: [
    TaskModule,
    TaskRoutingModule
  ],
  providers: [ ]
})
export class RootTaskModule { }
