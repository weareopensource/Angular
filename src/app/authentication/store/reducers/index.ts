import * as fromStatus from './status';
import * as fromLoginPage from './login-page';

export const reducers = {
  status: fromStatus.reducer,
  loginPage: fromLoginPage.reducer,
};
