import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatDialogRef } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-task-add-dialog',
  templateUrl: './task-add.dialog.component.html',
  styleUrls: ['./task-add.dialog.component.scss']
})
export class UserAddDialogComponent {
  public addUserForm = new FormGroup({});
  public taskModel = {
    title: '',
    description: ''
  };
  public taskFields: Array<FormlyFieldConfig> = [
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

  constructor(private dialogRef: MatDialogRef<UserAddDialogComponent>) { }

  onSubmit(): void {
    console.log('??');
    this.dialogRef.close(cloneDeep(this.taskModel));
  }
}
