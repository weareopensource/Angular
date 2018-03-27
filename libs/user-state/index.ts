export { UserStateModule } from './src/user-state.module';
export {
  selectUserIds,
  selectUserEntities,
  selectAllUsers,
  selectUserTotal,
  selectCurrentUser,
  selectUserLoading,
  selectUserLoaded
} from './src/+state/user.selectors';
export { UserState } from './src/+state/user.interfaces';
import * as fromUser from './src/+state/user.actions';
export { fromUser };
