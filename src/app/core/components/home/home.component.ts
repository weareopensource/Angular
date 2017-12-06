import { Component } from '@angular/core';
import { ArticleShared } from 'app/article/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private articleShared: ArticleShared) {
    articleShared.log(`let's do some usefull stuff`);
  }
}
