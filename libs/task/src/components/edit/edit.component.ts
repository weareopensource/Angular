import { ActivatedRoute, Router } from '@angular/router';
import { Inject, Component, OnInit, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { fromRouter } from '@labdat/router-state';
import { Store } from '@ngrx/store';
import { selectCurrentTask, fromTask} from '@labdat/task-state';
import { Task } from '@labdat/data-models';
import { ConnectFormStateSelectors } from '@labdat/connect-form-state/src/+state/selectors/connect-form-state.selectors';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { FormlyFieldConfig } from '@ngx-formly/core'
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-task-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
  })
  export class TaskEditComponent {

    editTaskForm = new FormGroup({});
    taskModel = { title: 'test', description: 'description' };
    taskFields: Array<FormlyFieldConfig> = [{
      key: 'title',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Title',
        placeholder: 'Enter title',
        required: true,
      }
    }, {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        type: 'text',
        label: 'Description',
        placeholder: 'Enter description',
        required: true,
      }
    }];

    constructor(public dialogRef: MatDialogRef<TaskEditComponent>) { }

    cancel() {
      this.dialogRef.close();
    }
    // Function called when form is submitted
    onSubmit(task: Task) {
      this.dialogRef.close(this.taskModel);
      //this.store.dispatch(new fromTask.Add({ task }));
    }
  }
