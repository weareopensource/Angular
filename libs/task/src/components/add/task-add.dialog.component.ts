import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatDialogRef } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';

@Component({
  templateUrl: './task-add.dialog.component.html',
  styleUrls: ['./task-add.dialog.component.scss']
})
export class TaskAddDialogComponent {
  public addTaskForm = new FormGroup({});
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

  constructor(private dialogRef: MatDialogRef<TaskAddDialogComponent>) { }

  onSubmit(): void {
    this.dialogRef.close(cloneDeep(this.taskModel));
  }
}
