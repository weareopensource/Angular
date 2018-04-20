import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './components/detail/user-detail.component';
import { UserDetailDialogComponent } from './components/detail/user-detail.dialog.component';
import { UserDetailPageComponent } from './components/detail/user-detail.page.component';
import { UsersListComponent } from './components/list/users-list.component';
import { UserDeleteDialogComponent } from './components/delete/user-delete.dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { RouterModule } from '@angular/router';
import { DisableControlDirective } from './directives/disable-control/disable-control.directive';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormlyModule } from '@ngx-formly/core';

const COMPONENTS = [
  UsersListComponent,
  UserDetailComponent,
  UserDetailPageComponent,
  UserDeleteDialogComponent,
  UserDetailDialogComponent
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
  MatListModule,
  MatSelectModule
];

@NgModule({
  declarations: [...COMPONENTS, DisableControlDirective],
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
    UserDeleteDialogComponent,
    UserDetailDialogComponent
  ]
})
export class UserViewModule { }
