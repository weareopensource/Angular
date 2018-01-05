import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ArticleState, articleAdapter } from './article.interfaces';
import * as fromArticle from './article.actions';
import { isEmpty } from 'lodash';
import { Article } from '../models/article.model';

const selectArticleState = createFeatureSelector<ArticleState>('article');

export const {
  selectIds: selectArticleIds,
  selectEntities: selectArticleEntities,
  selectAll: selectAllArticles,
  selectTotal: selectArticleTotal
} = articleAdapter.getSelectors(selectArticleState);

import { getCurrentUrl } from '@labdat/router-state';

export const selectCurrentArticle = createSelector(
  selectArticleEntities,
  getCurrentUrl,
  (articleEntities, currentUrl) => {
    const articleId = currentUrl.split('/')[2];
    return (!isEmpty(articleEntities[articleId]))
    ? articleEntities[articleId]
    : { mediaIds: [] } as Article
  }
);
