import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';

@Component({
  templateUrl: './task-edit.dialog.component.html',
  styleUrls: ['./task-edit.dialog.component.scss']
})
export class TaskEditDialogComponent implements OnInit {
  public editTaskForm = new FormGroup({});
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

  constructor(
    private dialogRef: MatDialogRef<TaskEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.taskModel = this.data.task;
  }

  onSubmit(): void {
    this.dialogRef.close(cloneDeep(this.taskModel));
  }
}
