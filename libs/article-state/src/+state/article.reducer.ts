import * as fromArticle from './article.actions';
import { Article } from '../models/article.model';
import { ArticleState, articleAdapter } from './article.interfaces';
import { keyBy } from 'lodash';
import { fromAuthentication } from '@labdat/authentication-state';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ActionReducerMap } from '@ngrx/store';

export const articleInitialState: ArticleState = articleAdapter.getInitialState();
export function articleReducer(state: ArticleState = articleInitialState, action: fromArticle.Actions | fromAuthentication.Actions): ArticleState {
  switch (action.type) {
    case fromArticle.LOAD_SUCCESS: {
/*
      return {
        ...state,
        ...action.payload
      };
    }
*/
      return articleAdapter.addAll(action.payload.articles, state);
    }

    case fromAuthentication.LOGOUT: {
//      return adapter.removeAll({ ...state, selectedUserId: null });
      return articleInitialState;
    }/*
    case article.HANDLE_SUCCESS: {
      return {
        articles: {
          ...state.articles,
          ...keyBy(action.payload.articles, 'id'),
        }
      };
    }*/
    case fromArticle.ADD_SUCCESS: {
      return articleAdapter.addOne(action.payload.article, state);
    }

    case fromArticle.UPDATE_SUCCESS: {
      return articleAdapter.updateOne(action.payload.article, state);
    }

    case fromArticle.ADD_MEDIAS_SUCCESS: {
      const { id, changes } = action.payload.article;
      const mediaIds = state.entities[id].mediaIds.concat(changes.mediaIds)
      return articleAdapter.updateOne({id , changes: { mediaIds }}, state)
    }

    case fromArticle.UPDATE_SUCCESS: {
      return articleAdapter.updateOne(action.payload.article, state);
    }

    case fromArticle.DELETE_SUCCESS: {
      return articleAdapter.removeOne(action.payload.articleId, state);
    }

    case fromArticle.DELETE_FAILURE: {
      return state;
    }

    default: {
      return state;
    }
  }
}
