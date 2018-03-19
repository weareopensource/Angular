import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { fromRouter } from '@labdat/router-state';
import { Store } from '@ngrx/store';
import { fromTask } from '@labdat/task-state';
import { Task } from '@labdat/data-models';

@Component({
  selector: 'app-task-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class TasksAddComponent implements OnInit {
  addTaskForm: FormGroup;
  success = false;
  error: any;

  constructor(private store: Store<any>, private _fb: FormBuilder) {
    this.addTaskForm = this._buildForm();
  }

  ngOnInit(): void {}

  close(): void {
    this.store.dispatch(new fromRouter.Back());
  }

  // Function iniating the form
  private _buildForm(): FormGroup {
    return this._fb.group({
      title: new FormControl('', Validators.required)
    });
  }

  // Function called when form is submitted
  onSubmit(form: FormGroup): void {
    if (form.valid) {
      let task: Task;
      task = {
        id: undefined,
        title: form.get('title').value,
        description: undefined,
        createdDate: undefined,
        updatedDate: undefined,
        userIds: undefined,
        comments: undefined
      };
      this.success = false;
      this.store.dispatch(new fromTask.Add({ task }));
    } else {
      return;
    }
  }

  onSuccess(): void {
    this.success = true;
    this.store.dispatch(new fromTask.Load());
  }

  onError(error): void {
    this.error = error;
  }
}
