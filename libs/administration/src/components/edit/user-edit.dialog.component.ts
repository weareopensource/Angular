import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit.dialog.component.html',
  styleUrls: ['./user-edit.dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit {
  public editUserForm = new FormGroup({});
  public userModel = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    roles: ''
  };
  public userFields: Array<FormlyFieldConfig> = [
    {
      key: 'firstName',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'First Name',
        placeholder: 'Enter the user first name',
        required: true
      }
    },
    {
      key: 'lastName',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Last Name',
        placeholder: 'Enter the user last name',
        required: true
      }
    },
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'User Name',
        placeholder: 'Enter the user nick name',
        required: true
      }
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: 'Email',
        placeholder: 'Enter the user email',
        required: true
      }
    },
    {
      key: 'roles',
      type: 'select',
      templateOptions: {
        label: 'Roles',
        multiple: true,
        options: [
          {label: 'User', value: 'user'},
          {label: 'Admin', value: 'admin'}
        ],
        required: true
      }
    }
  ];

  constructor(
    private dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.userModel = this.data.user;
  }

  onSubmit(): void {
    this.dialogRef.close(cloneDeep(this.userModel));
  }
}
