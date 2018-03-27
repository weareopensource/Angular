import { Action } from '@ngrx/store';
import { User } from '@labdat/data-models';

export const SHOW = '[User] Show';
export const LOAD = '[User] Load';
export const LOAD_SUCCESS = '[User] Load Success';
export const LOAD_FAILURE = '[User] Load Failure';
export const HANDLE = '[User] Handle';
export const HANDLE_SUCCESS = '[User] Handle Success';
export const HANDLE_FAILURE = '[User] Handle Failure';
export const ADD = '[User] Add';
export const ADD_SUCCESS = '[User] Add Success';
export const ADD_FAILURE = '[User] Add Failure';
export const UPDATE = '[User] Update';
export const UPDATE_SUCCESS = '[User] Update Success';
export const UPDATE_FAILURE = '[User] Update Failure';
export const DELETE = '[User] Delete';
export const DELETE_SUCCESS = '[User] Delete Success';
export const DELETE_FAILURE = '[User] Delete Failure';
export const SAVE_DESCRIPTION = '[User] Save Description';
export const ADD_MEDIAS_SUCCESS = '[User] Add Medias Success';
export const DELETE_MEDIAS_SUCCESS = '[User] Delete Medias Success';

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
  | DeleteMediasSuccess;

export class Load implements Action {
  readonly type = LOAD;
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: { users: Array<User> }) {}
}

export class LoadFailure implements Action {
  readonly type = LOAD_FAILURE;
  constructor(public payload: { error: any }) {}
}

export class Handle implements Action {
  readonly type = HANDLE;
  constructor(public payload: { userId: Number }) {}
}

export class HandleSuccess implements Action {
  readonly type = HANDLE_SUCCESS;
  constructor(public payload: { user: User }) {}
}

export class HandleFailure implements Action {
  readonly type = HANDLE_FAILURE;
  constructor(public payload: { error: any }) {}
}

export class Add implements Action {
  readonly type = ADD;
  constructor(public payload: { user: User }) {}
}

export class AddSuccess implements Action {
  readonly type = ADD_SUCCESS;
  constructor(public payload: { user: User }) {}
}

export class AddFailure implements Action {
  readonly type = ADD_FAILURE;
  constructor(public payload: { error: any }) {}
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public payload: { user: { id: number; changes: any } }) {}
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;
  constructor(public payload: { user: { id: number; changes: any } }) {}
}

export class AddMediasSuccess implements Action {
  readonly type = ADD_MEDIAS_SUCCESS;
  constructor(public payload: { user: { id: number; changes: any } }) {}
}

export class DeleteMediasSuccess implements Action {
  readonly type = DELETE_MEDIAS_SUCCESS;
  constructor(public payload: { user: { id: number; changes: any } }) {}
}

export class UpdateFailure implements Action {
  readonly type = UPDATE_FAILURE;
  constructor(public payload: { error: any }) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: { userId: string }) {}
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;
  constructor(public payload: { userId: string }) {}
}

export class DeleteFailure implements Action {
  readonly type = DELETE_FAILURE;
  constructor(public payload: { error: any }) {}
}

export class SaveDescription implements Action {
  readonly type = SAVE_DESCRIPTION;
  constructor(public payload: { userId: number; text: string }) {}
}
