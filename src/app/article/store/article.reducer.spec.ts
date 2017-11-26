import { articleReducer } from './article.reducer';
import { ArticleState } from './article.interfaces';
import * as CoreActions from './article.actions';

describe('productsReducer', () => {
  it('should work', () => {
    const state: ArticleState = { greetings: '' };
    const action = new CoreActions.InitGreetings('Hello');
    const actual = articleReducer(state, action);
    expect(actual).toEqual({ showSidenav: true });
  });
});
