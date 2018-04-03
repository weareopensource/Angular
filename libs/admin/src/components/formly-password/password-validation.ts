import {AbstractControl} from '@angular/forms';
export class PasswordValidation {
    static MatchPassword(AC: AbstractControl): void {
      const password = AC.get('password').value;
      const confirmPassword = AC.get('confirmPassword').value;
      console.log(password);
      console.log(confirmPassword);
      if (password !== confirmPassword) {
          console.log('false');
          AC.get('confirmPassword')
          .setErrors({ MatchPassword: true });
      } else {
          console.log('true');
      }
    }
}
