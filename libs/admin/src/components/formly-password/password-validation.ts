import {AbstractControl} from '@angular/forms';
export class PasswordValidation {
  static MatchPassword(AC: AbstractControl): void {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('confirmPassword').value;
    if (password !== confirmPassword) {
        AC.get('confirmPassword')
        .setErrors({ MatchPassword: true });
    } else {
        console.log('true');
    }
  }
}
