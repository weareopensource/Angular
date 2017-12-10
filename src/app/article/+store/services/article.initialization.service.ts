import { Injectable, Inject } from "@angular/core";
import * as CoreActions from "../store/article.actions";
import { ArticleState } from "./article.interfaces";
import { Store } from "@ngrx/store";

@Injectable()
export class ArticleInitialization {
  constructor(private store: Store<ArticleState>) { }
  
  public initGreetings(configuration) {
    this.store.dispatch(new CoreActions.InitGreetings(configuration));
  }
}