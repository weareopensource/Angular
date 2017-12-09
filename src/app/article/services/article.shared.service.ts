import { Injectable } from '@angular/core';

@Injectable()
export class ArticleSharedService {
  log(message) {
    console.log(`%c${message}`, "color: blue; font-size:15px;"); 
  }
}
