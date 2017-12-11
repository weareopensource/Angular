import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticleState } from '../states/article.state';

const getArticleState = createFeatureSelector<ArticleState>('article');
export const getGreetings = createSelector(getArticleState, (state: ArticleState) => state.greetings);
