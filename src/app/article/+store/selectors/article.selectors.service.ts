import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticleState } from './article.interfaces';

@Injectable()
export class ArticleSelectors {
  public getGreetings;
  constructor() {
    const getArticleState = createFeatureSelector<ArticleState>('article');
    this.getGreetings = createSelector(
      getArticleState,
      (state: ArticleState) => state.greetings
    );
  }
}
