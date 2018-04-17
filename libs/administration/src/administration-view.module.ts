import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './components/detail/user-detail.component';
import { UsersListComponent } from './components/list/users-list.component';
import { UserDeleteDialogComponent } from './components/delete/user-delete.dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
import { FormlyModule } from '@ngx-formly/core';

const COMPONENTS = [
  UsersListComponent,
  UserDetailComponent,
  UserDeleteDialogComponent
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
    UserDeleteDialogComponent
  ]
})
export class AdministrationViewModule { }
