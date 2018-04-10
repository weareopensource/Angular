export { coreConfiguration } from './src/core.configuration';
export { CoreViewModule } from './src/core-view.module';
export { CoreRoutingModule } from './src/core-routing.module';
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
export { HomeComponent } from './src/components/home/home.component';
export { LayoutComponent } from './src/components/layout/layout.component';
export { NotFoundComponent } from './src/components/not-found/not-found.component';
export { MenuItem } from './src/models/menu-item.model';
