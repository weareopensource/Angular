import * as ArticleActions from './article.actions';
import { ArticleState } from './article.interfaces';

const initialArticleState: ArticleState = { greetings: '' }

export function articleReducer(state: ArticleState = initialArticleState, action: ArticleActions.Actions): ArticleState {
  switch (action.type) {
    case ArticleActions.INIT_GREETINGS:
      return {
        ...state,
        greetings: action.payload
      }
    default:
      return state;
  }
}