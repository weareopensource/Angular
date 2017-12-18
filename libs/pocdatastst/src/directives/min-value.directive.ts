import { AbstractControl, ValidatorFn } from '@angular/forms';

export function minValueValidator(min: number, strict?: boolean): ValidatorFn {
    
    return (control: AbstractControl): {[key: string]: any} => {
        const input = control.value;
        let isValid = true;

        if(input){
            let minNumber = parseFloat(input.replace(',','.'));

            if(!isNaN(minNumber)) {
                isValid = strict ? min < minNumber : min <= minNumber;
            }
        }

        return !isValid ? { 'minValue': { min } } : null;
    };
  }