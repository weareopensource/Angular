import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './profile.dialog.component.html',
  styleUrls: ['./profile.dialog.component.scss']
})
export class ProfileDialogComponent {

  @ViewChild('userName')
  public userName;

  @ViewChild('firstName')
  public firstName;

  @ViewChild('lastName')
  public lastName;

  @ViewChild('email')
  public email;

  public editMode = false;
  public rolesControl = this._formBuilder.control(this.user.roles);
  public emailControl = this._formBuilder.control(this.user.email);

  constructor(
    @Inject(MAT_DIALOG_DATA) public user,
    private _dialogRef: MatDialogRef<ProfileDialogComponent>,
    private _formBuilder: FormBuilder
  ) { }

  public saveOnClose(): void {
    this._dialogRef.close({
      id: this.user.id,
      username: this.userName.nativeElement.innerText,
      firstName: this.firstName.nativeElement.innerText,
      lastName: this.lastName.nativeElement.innerText,
      email: this.emailControl.value,
      roles: this.rolesControl.value
    });
  }
}
