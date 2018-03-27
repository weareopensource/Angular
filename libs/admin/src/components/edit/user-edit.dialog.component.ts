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
    title: '',
    description: ''
  };
  public userFields: Array<FormlyFieldConfig> = [
    {
      key: 'title',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Title',
        placeholder: 'Enter title',
        required: true
      }
    },
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        type: 'text',
        label: 'Description',
        placeholder: 'Enter description',
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
