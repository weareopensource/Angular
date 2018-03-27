import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userAdapter, UserState } from './user.interfaces';
import { isEmpty } from 'lodash';
import { User } from '@labdat/data-models';
import { selectCurrentUrl } from '@labdat/router-state';

const selectUserState = createFeatureSelector<UserState>('user');

export const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectUserTotal
} = userAdapter.getSelectors(selectUserState);

export const selectCurrentUser = createSelector(selectUserEntities, selectCurrentUrl, (userEntities, currentUrl) => {
  const userId = currentUrl.split('/')[2];

  return !isEmpty(userEntities[userId]) ? userEntities[userId] : ({ comments: [] } as User);
});

export const selectUserLoading = createSelector(selectUserState, (state: UserState) => state.loading);
export const selectUserLoaded = createSelector(selectUserState, (state: UserState) => state.loaded);
