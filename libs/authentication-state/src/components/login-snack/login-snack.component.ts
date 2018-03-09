import { Component, HostBinding, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'login-snack',
  template: '{{data}}'
})
export class LoginSnackComponent {
  @HostBinding('class.mat-typography')
  matTypo() {
    return true;
  }

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
