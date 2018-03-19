export { CoreStateModule } from './src/core-state.module';

import * as fromCore from './src/+state/actions/core-state.actions';
export { fromCore };
export {
  getShowSidenav,
  getMenuItems,
  getTitle,
  getLogo
} from './src/+state/selectors/core-state.selectors';
export { CoreState } from './src/+state/states/core-state.state';
