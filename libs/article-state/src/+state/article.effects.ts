import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { catchError } from 'rxjs/operators/catchError';
import { mapTo } from 'rxjs/operators/mapTo';
import { tap } from 'rxjs/operators/tap';

import { defer } from 'rxjs/observable/defer';
import { toPayload } from '@ngrx/effects';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/from';
import { ArticleApiService } from '../services/article.api.service';
import * as ArticleActions from './article.actions';
//import { Database } from '@ngrx/db';
import { keyBy } from 'lodash';
import { fromAuthentication } from '@labdat/authentication-state';

@Injectable()
export class ArticleEffects {

  @Effect()
  loginSuccess$ = this.actions$
    .ofType(fromAuthentication.LOGIN_SUCCESS)
    .pipe(
      mapTo(new ArticleActions.Load())
    )

  @Effect()
  load$ = this.actions$
    .ofType(ArticleActions.LOAD)
    .pipe(
      switchMap(() => this.articleApiService.loadArticles()),
      map((response: any) => new ArticleActions.LoadSuccess({articles: response.articles})),
      catchError(error => of(new ArticleActions.LoadFailure(error)))
    )

  @Effect()
  add$ = this.actions$
    .ofType(ArticleActions.ADD)
    .pipe(
      map(toPayload),
      switchMap((payload) => this.articleApiService.addArticle(payload.article)),
      map((response: any) => new ArticleActions.AddSuccess({article: response.article})),
      catchError(error => of(new ArticleActions.AddFailure(error)))
    )
;

  @Effect()
  update$ = this.actions$
    .ofType(ArticleActions.UPDATE)
    .pipe(
      map(toPayload),
      switchMap((payload) => this.articleApiService.updateArticle(payload.article)),
      map((response: any) => new ArticleActions.UpdateSuccess({ article: { id: response.id, changes: {...response} }})),
      catchError(error => of(new ArticleActions.UpdateFailure(error)))
    )

  @Effect()
  delete$ = this.actions$
    .ofType(ArticleActions.DELETE)
    .pipe(
      map(toPayload),
      switchMap((payload) => this.articleApiService.deleteArticle(payload.articleId)),
      map((response: any) => new ArticleActions.DeleteSuccess({articleId: response.id})),
      catchError(error => of(new ArticleActions.DeleteFailure(error)))
    )

    @Effect({dispatch: false})
    saveDescription$ = this.actions$
      .ofType(ArticleActions.SAVE_DESCRIPTION)
      .pipe(
        map(toPayload),
        tap((payload) => sessionStorage.setItem(`article${payload.articleId}Desciption`, payload.text))
      )

/*
  @Effect()
  handle$ = this.actions$
    .ofType(ArticleActions.HANDLE)
    .map(toPayload)
    .switchMap(id => this.articleApiService.handle(id))
    .catch(error => of(new ArticleActions.HandleFailure(error)));
*/
  constructor(
    private actions$: Actions,
    private articleApiService: ArticleApiService,
    private router: Router,
  ) {}
}
