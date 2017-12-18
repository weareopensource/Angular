import { AbstractControl, ValidatorFn } from '@angular/forms';

export function maxValueValidator(max: number, strict?: boolean): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const input = control.value;
        let isValid = true;

        if(input){
            let maxNumber = parseFloat(input.replace(',','.'));

            if(!isNaN(maxNumber)) {
                isValid = (strict) ? max > maxNumber : max >= maxNumber;
            }
        }
        
        return !isValid ? { 'maxValue': { max } } : null;
    };
  }