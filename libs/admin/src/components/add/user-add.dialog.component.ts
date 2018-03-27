import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatDialogRef } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-user-add-dialog',
  templateUrl: './user-add.dialog.component.html',
  styleUrls: ['./user-add.dialog.component.scss']
})
export class UserAddDialogComponent {
  public addUserForm = new FormGroup({});
  public userModel = {
    firstName: '',
    lastName: '',
    userName: '',
    email: ''
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
      key: 'userName',
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
        type: 'text',
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
          {label: 'Admin', value: 'iron_man'}
        ],
        required: true
      }
    }
  ];

  constructor(private dialogRef: MatDialogRef<UserAddDialogComponent>) { }

  onSubmit(): void {
    this.dialogRef.close(cloneDeep(this.userModel));
  }
}
