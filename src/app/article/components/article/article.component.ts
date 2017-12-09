import { Component } from '@angular/core';
import { ArticleSelectors } from '../../store/article.selectors';
import { ArticleState } from '../../store/article.interfaces';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  public greetings$ = this.store.select(this.articleSelectors.getGreetings)
  constructor(private store: Store<ArticleState>, private articleSelectors: ArticleSelectors) {}
}
