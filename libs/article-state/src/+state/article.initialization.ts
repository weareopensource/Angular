import { Injectable, Inject } from "@angular/core";
import * as fromArticle from "./article.actions";
import { ArticleState } from "./article.interfaces";
import { Store } from "@ngrx/store";
import { getLoggedIn } from "@labdat/authentication-state";
import { Observable } from "rxjs/Observable";
import { first } from "rxjs/operators/first";

@Injectable()
export class ArticleInitializationService {
  constructor(private store: Store<ArticleState>) { }

  public loadArticles() {
    this.store.select(getLoggedIn)
    .pipe(
      first()
    )
    .subscribe(loggedIn => {
      if (loggedIn) {
        this.store.dispatch(new fromArticle.Load());
      }
    });
  }
}
