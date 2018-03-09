import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class TaskEditComponent {
  editTaskForm = new FormGroup({});
  taskModel = { title: 'test', description: 'description' };
  taskFields: Array<FormlyFieldConfig> = [
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

  constructor(public dialogRef: MatDialogRef<TaskEditComponent>) {}

  cancel() {
    this.dialogRef.close();
  }
  // Function called when form is submitted
  onSubmit() {
    this.dialogRef.close(this.taskModel);
    // this.store.dispatch(new fromTask.Add({ task }));
  }
}
