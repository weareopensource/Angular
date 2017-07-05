import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';

import {UsersService} from 'app/users';
import { SessionActions, IAppState, ISessionRecord, IUserRecord, IMessage } from 'app/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges {

  form: FormGroup;
  private model: any;

  @select(['session', 'isLoading']) isLoading$: Observable<boolean>;
  @select(['session', 'hasMessage']) hasMessage$: Observable<IMessage>;


  constructor(private actions: SessionActions, private ngRedux: NgRedux<IAppState> ) {
    this.form = this._buildForm();
  }
  /**
  * OnInit implementation
  */
  ngOnInit() {
    this.ngRedux.select(['session', 'user']).first().subscribe((user: IUserRecord) => {
       const  {firstName, lastName, email, username} = this.model = user ;
       this.form.patchValue({firstName, lastName, email, username});
       this.form.controls['email'].disable();
       this.form.controls['username'].disable();
    });
  }

  /**
  * Function to handle component update
  *
  * @param record
  */
  ngOnChanges(record) {
    if (record.model && record.model.currentValue) {
      this.model = record.model.currentValue;
      this.form.patchValue(this.model);
    }
  }


  saveProfile(user) {
    this.actions.editProfile(user);
  }

  /**
  * Function to build our form
  *
  * @returns {FormGroup}
  *
  * @private
  */
    private _buildForm() {
      return new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required)
      });
    }

}
