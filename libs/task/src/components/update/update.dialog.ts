import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './add.dialog.html',
  styleUrls: ['./add.dialog.scss']
})
export class TaskDeleteDialog {

  constructor (
    public dialogRef: MatDialogRef<TaskDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick (): void {
    this.dialogRef.close();
  }
}
