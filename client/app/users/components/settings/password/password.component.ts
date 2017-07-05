import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';

import { IMessage, SessionActions } from 'app/core';
import {EqualValidator} from '.';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  form: FormGroup;

  @select(['session', 'isLoading']) isLoading$: Observable<boolean>;
  @select(['session', 'hasMessage']) hasMessage$: Observable<IMessage>;

  constructor(private actions: SessionActions) {
    this.form = this._buildForm();
  }

  ngOnInit() {
  }

  /**
  * Function to handle component update
  *
  * @param record
  */
  ngOnChanges(record) {
  }

  private _buildForm() {
    return new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      verifyPassword: new FormControl('', Validators.required)
    });
  }
  changePasword(value) {
    console.log(value);
    this.actions.changePassword(value);
  }
}
