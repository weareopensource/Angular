import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userAdapter, UserState } from './user.interfaces';
import { isEmpty } from 'lodash';
import { selectCurrentUrl } from '@labdat/common/router-state';

const selectUserState = createFeatureSelector<UserState>('user');

export const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectUserTotal
} = userAdapter.getSelectors(selectUserState);

export const selectSelectedUser = createSelector(selectUserEntities, selectCurrentUrl, (userEntities, currentUrl) => {
  // tslint:disable-next-line:newline-per-chained-call
  const userId = currentUrl.split('/')[2] && currentUrl.split('/')[2].split('(')[0];

  return !isEmpty(userEntities[userId]) ? userEntities[userId] : undefined;
});

export const selectUserLoading = createSelector(selectUserState, (state: UserState) => state.loading);
export const selectUserLoaded = createSelector(selectUserState, (state: UserState) => state.loaded);
