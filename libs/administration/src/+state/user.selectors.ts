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
  const userId = currentUrl.split('/')[3];
  console.log(userEntities, currentUrl.split('/')[3]);
  return !isEmpty(userEntities[userId]) ? userEntities[userId] : undefined;
});

export const selectUserLoading = createSelector(selectUserState, (state: UserState) => state.loading);
export const selectUserLoaded = createSelector(selectUserState, (state: UserState) => state.loaded);
