import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ArticleState, getGreetings } from 'app/article/+store';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  public greetings$ = this.store.select(getGreetings)
  constructor(private store: Store<ArticleState>) {}
}
