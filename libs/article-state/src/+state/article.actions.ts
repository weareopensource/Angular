import { Action } from '@ngrx/store';
import { Article } from '../models/article.model';

export const SHOW = '[Article] Show';
export const LOAD = '[Article] Load';
export const LOAD_SUCCESS = '[Article] Load Success';
export const LOAD_FAILURE = '[Article] Load Failure';
export const HANDLE = '[Article] Handle';
export const HANDLE_SUCCESS = '[Article] Handle Success';
export const HANDLE_FAILURE = '[Article] Handle Failure';
export const ADD = '[Article] Add';
export const ADD_SUCCESS = '[Article] Add Success';
export const ADD_FAILURE = '[Article] Add Failure';
export const UPDATE = '[Article] Update';
export const UPDATE_SUCCESS = '[Article] Update Success';
export const UPDATE_FAILURE = '[Article] Update Failure';
export const DELETE = '[Article] Delete';
export const DELETE_SUCCESS = '[Article] Delete Success';
export const DELETE_FAILURE = '[Article] Delete Failure';
export const SAVE_DESCRIPTION = '[Article] Save Description';
export const ADD_MEDIAS_SUCCESS = '[Article] Add Medias Success';
export const DELETE_MEDIAS_SUCCESS = '[Article] Delete Medias Success';

export type Actions =
| Load
| LoadSuccess
| LoadFailure
| Handle
| HandleSuccess
| HandleFailure
| Add
| AddSuccess
| AddFailure
| Update
| UpdateSuccess
| UpdateFailure
| Delete
| DeleteSuccess
| DeleteFailure
| SaveDescription
| AddMediasSuccess
| DeleteMediasSuccess
;

export class Load implements Action {
  readonly type = LOAD;
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: { articles: Article[]}) {}
}

export class LoadFailure implements Action {
  readonly type = LOAD_FAILURE;
  constructor(public payload: { error: any }) {}
}

export class Handle implements Action {
  readonly type = HANDLE;
  constructor(public payload: { articleId: Number }) {}
}

export class HandleSuccess implements Action {
  readonly type = HANDLE_SUCCESS;
  constructor(public payload: { article: Article }) {}
}

export class HandleFailure implements Action {
  readonly type = HANDLE_FAILURE;
  constructor(public payload: { error: any }) {}
}

export class Add implements Action {
  readonly type = ADD;
  constructor(public payload: { article: Article }) {}
}

export class AddSuccess implements Action {
  readonly type = ADD_SUCCESS;
  constructor(public payload: { article: Article }) {}
}

export class AddFailure implements Action {
  readonly type = ADD_FAILURE;
  constructor(public payload: { error: any }) {}
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public payload: { article: { id: number, changes: any }}) {}
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;
  constructor(public payload: { article: { id: number, changes: any }}) {}
}

export class AddMediasSuccess implements Action {
  readonly type = ADD_MEDIAS_SUCCESS;
  constructor(public payload: { article: { id: number, changes: any }}) {}
}

export class DeleteMediasSuccess implements Action {
  readonly type = DELETE_MEDIAS_SUCCESS;
  constructor(public payload: { article: { id: number, changes: any }}) {}
}

export class UpdateFailure implements Action {
  readonly type = UPDATE_FAILURE;
  constructor(public payload: { error: any }) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: { articleId: string }) {}
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;
  constructor(public payload: { articleId: string }) {}
}

export class DeleteFailure implements Action {
  readonly type = DELETE_FAILURE;
  constructor(public payload: { error: any }) {}
}

export class SaveDescription implements Action {
  readonly type = SAVE_DESCRIPTION;
  constructor(public payload: { articleId: number, text: string}) {}
}
