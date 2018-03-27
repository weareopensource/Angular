import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './task-delete.dialog.component.html'
})
export class UserDeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
