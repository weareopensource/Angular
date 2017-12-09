import { Component } from '@angular/core';
import { ArticleSharedService } from 'app/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private articleSharedService: ArticleSharedService) {
    articleSharedService.log(`let's do some usefull stuff`);
  }
}
