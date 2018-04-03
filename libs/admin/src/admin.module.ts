// import { ConnectFormDirective } from '@labdat/connect-form/src/components/directives';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './components/detail/user-detail.component';
import { UsersListComponent } from './components/list/user-list.component';
import { UserAddComponent } from './components/add/user-add.component';
import { UserAddDialogComponent } from './components/add/user-add.dialog.component';
import { UserEditComponent } from './components/edit/user-edit.component';
import { UserEditDialogComponent } from './components/edit/user-edit.dialog.component';
import { UserDeleteDialogComponent } from './components/delete/user-delete.dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { RouterModule } from '@angular/router';
import { RootAdminRoutingModule } from '@labdat/admin-routing';

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
import { FormlyPasswordComponent } from './components/formly-password/formly-password.component';
import { FormlyModule } from '@ngx-formly/core';

const COMPONENTS = [
  UsersListComponent,
  UserDetailComponent,
  UserDeleteDialogComponent,
  UserEditComponent,
  UserEditDialogComponent,
  UserAddComponent,
//  ConnectFormDirective,
  UserAddDialogComponent,
  FormlyPasswordComponent
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
    FormlyModule.forChild({
      types: [
      {
        name: 'password',
        component: FormlyPasswordComponent
      }
    ]
    }),
    FormlyMaterialModule,
    RouterModule
  ],
  entryComponents: [
    UserDeleteDialogComponent,
    UserEditDialogComponent,
    UserAddDialogComponent
  ]
})
export class AdminModule { }

@NgModule({
  imports: [ AdminModule, RootAdminRoutingModule ]
})
export class RootAdminModule { }
