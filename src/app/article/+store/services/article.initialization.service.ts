import { Injectable, Inject } from "@angular/core";
import * as CoreActions from "../actions/article.actions";
import { ArticleState } from "../states/article.state";
import { Store } from "@ngrx/store";

@Injectable()
export class ArticleInitializationService {
  constructor(private store: Store<ArticleState>) { }
  
  public initGreetings(configuration) {
    this.store.dispatch(new CoreActions.InitGreetings(configuration));
  }
}