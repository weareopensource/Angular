import { PipeTransform, Pipe } from '@angular/core';

import * as _ from 'lodash';

@Pipe({name: 'recognitionDisplay'})
export class RecognitionDisplayPipe implements PipeTransform {
  transform(value: any) : any {
    let result = '';

    if (value) {
      let text: string;
      let entity_list: Array<any>;
      let textMessage = _.find(value, function(o) { return o.key === 'text'; });
      let entity_listMessage = _.find(value, function(o) { return o.key === 'entity_list'; });

      textMessage ? text = textMessage.message : '';
      entity_listMessage ? entity_list = entity_listMessage.message.slice(0) : [];
      result = this.recognition(_.cloneDeep(text), _.cloneDeep(entity_list))
    }

    return result;
  }

  private recognition(text: string, entity_list: Array<any>): string {
    let result = '';
    let startDiv = '<div class="entities">';
    let endDiv = '</div>';
    let startTag = '';
    let endTag = '';
    let shift = 0;
  
    _.forEach(entity_list, n => {
      // We add the length of the previous addition of html tags inside text
      n.start = n.start + shift;
      n.end = n.end + shift;
  
      // We add the right class accordinfg to the type
      if (n.type) {
        startTag = `<div class="${n.type.toLowerCase()}">`;
        endTag = '</div>';
        shift = shift + startTag.length + endTag.length;
      }
  
      // console.log('****  shift : ', shift);
      // console.log('****  Keep 1 :', text.substr(0, n.start - 1));
      // console.log('****  substr:', text.substr(n.start, n.word.length));
      // console.log('****  Keep 2:', text.substr(n.end, text.length - 1));
  
      // We replace the previous text by the new one (Warning : in Python, a string begins at 1 not 0 !)
      text = text.substr(0, n.start) + startTag + text.substr(n.start, n.word.length) + endTag + text.substr(n.end, text.length - 1);
    });
  
    result = startDiv + text + endDiv;

    return result;
  }
}