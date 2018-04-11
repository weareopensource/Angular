import { Component, HostBinding, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'task-snack',
  template: '{{ data }}'
})
export class TaskSnackComponent {

  @HostBinding('class.mat-typography')
  matTypo(): boolean {
    return true;
  }

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
