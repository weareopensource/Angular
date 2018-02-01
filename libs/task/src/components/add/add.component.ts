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

@Component({
    selector: 'app-task-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
  })
  export class TasksAddComponent implements OnInit {
    addTaskForm: FormGroup;
    success: boolean = false;
    error: any;

    constructor(private store: Store<any>, private _fb: FormBuilder) { 
      this.addTaskForm = this._buildForm();
    }

    ngOnInit(): void {
    }

    close() {
      this.store.dispatch(new fromRouter.Back());
    }

    // Function iniating the form
    private _buildForm() {
      return this._fb.group({
        title: new FormControl('', Validators.required)
      });
    }

    // Function called when form is submitted
    onSubmit(form: FormGroup) {
      if (form.valid) {
        let task: Task;
        task = {id: null, title: form.get('title').value, description: null, createdDate: null, updatedDate: null, userIds: null, comments: null };
        this.success = false;
        
        this.store.dispatch(new fromTask.Add({ task: task }));
      
      } else {
        return;
      }
    }

    onSuccess() {
      this.success = true;
      this.store.dispatch(new fromTask.Load());
    }

    onError( error ) {
      this.error = error;
    }
  }
