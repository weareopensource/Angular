// import { ConnectFormDirective } from '@labdat/connect-form/src/components/directives';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDetailComponent } from './components/detail/task-detail.component';
import { TasksListComponent } from './components/list/task-list.component';
import { TaskAddComponent } from './components/add/task-add.component';
import { TaskAddDialogComponent } from './components/add/task-add.dialog.component';
import { TaskEditComponent } from './components/edit/task-edit.component';
import { TaskEditDialogComponent } from './components/edit/task-edit.dialog.component';
import { TaskDeleteDialogComponent } from './components/delete/task-delete.dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { RouterModule } from '@angular/router';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

const COMPONENTS = [
  TasksListComponent,
  TaskDetailComponent,
  TaskDeleteDialogComponent,
  TaskEditComponent,
  TaskEditDialogComponent,
  TaskAddComponent,
//  ConnectFormDirective,
  TaskAddDialogComponent
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
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormlyModule,
    FormlyMaterialModule,
    RouterModule
  ],
  entryComponents: [
    TaskDeleteDialogComponent,
    TaskEditDialogComponent,
    TaskAddDialogComponent
  ]
})
export class TaskViewModule { }
