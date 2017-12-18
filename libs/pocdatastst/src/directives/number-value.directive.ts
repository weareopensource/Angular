import { AbstractControl, ValidatorFn } from '@angular/forms';

export function numberValueValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const input = control.value;
        let isValid = true;

        if(input){
            let tmp = input.replace(',','.');
            isValid = !isNaN(tmp);
        }

        return !isValid ? { 'numberValue': { value: input } } : null;
    };
  }