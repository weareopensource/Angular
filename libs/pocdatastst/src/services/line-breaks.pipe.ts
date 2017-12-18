import { PipeTransform, Pipe } from '@angular/core';
import * as _ from 'lodash';

@Pipe({name: 'lineBreaks'})
export class LineBreaksPipe implements PipeTransform {
  transform(value: any) : any {
    if (value && typeof value === "string") {
      let filteredValue: string;

      filteredValue = value.replace(/(?:\r\n|\r|\n)/g, '<br />');

      return filteredValue;
    } else {
      return value;
    }
  }
}