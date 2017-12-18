import { AbstractControl, ValidatorFn } from '@angular/forms';

export function minLengthValidator(min: number, strict?: boolean): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const input = control.value;
        let isValid = true;

        if(input){
            let gist = input.trim();
            let length = gist === '' ? 0 : gist.split(' ').length;
            // TODO: manage the line breaks ?
            // let lengthBreakLine = gist === '' ? 0 : gist.split('\n').length;

            isValid = (strict) ? min < length : min <= length;
        }
        
        return !isValid ? { 'minLength': { min } } : null;
    };
  }
  