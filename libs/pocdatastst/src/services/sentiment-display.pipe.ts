import { PipeTransform, Pipe } from '@angular/core';

import * as _ from 'lodash';

@Pipe({name: 'sentimentDisplay'})
export class SentimentDisplayPipe implements PipeTransform {
  transform(value: any) : any {
    let result = '';

    if (value) {
      let text: string;
      let keyword: Array<any>;
      let textMessage = _.find(value, function(o) { return o.key === 'text'; });
      let keywordMessage = _.find(value, function(o) { return o.key === 'keyword'; });

      textMessage ? text = textMessage.message : '';
      keywordMessage ? keyword = keywordMessage.message.slice(0) : [];
      result = this.recognition(_.cloneDeep(text), _.cloneDeep(keyword));
    }

    return result;
  }

  private recognition(text: string, ner: Array<any>): string {
    let result = '';
    let startDiv = '<div class="sentiment">';
    let endDiv = '</div>';
    let startTag = '';
    let endTag = '';
    let shift = 0;
  
    _.forEach(ner, n => {
      // We add the length of the previous addition of html tags inside text
      n.start = n.start + shift;
      n.end = n.end + shift;
  
      // We add the right class accordinfg to the type
      startTag = '<div class="bad-mood">';
      endTag = '</div>';
      shift = shift + startTag.length + endTag.length;
  
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