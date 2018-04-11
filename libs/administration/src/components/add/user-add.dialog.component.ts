import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatDialogRef } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';

@Component({
  templateUrl: './user-add.dialog.component.html',
  styleUrls: ['./user-add.dialog.component.scss']
})
export class UserAddDialogComponent {
  public addUserForm = new FormGroup({});
  public userModel = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    roles: [],
    password: ''
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
        type: 'text',
        label: 'Email',
        placeholder: 'Enter the user email',
        required: true
      }
    },
    {
      key: 'password',
      type: 'password',
      validation: Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(2)])
    },
    {
      key: 'passwordConfirmation',
      type: 'password'
//      validation: Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(2)])
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

  constructor(private dialogRef: MatDialogRef<UserAddDialogComponent>) { }

  onSubmit(): void {
    this.dialogRef.close(cloneDeep(this.userModel));
  }
}
