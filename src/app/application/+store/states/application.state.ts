import { RouterReducerState } from "@ngrx/router-store";
import { RouterStateUrl } from "./router.state";

export interface ApplicationState {
  router: RouterReducerState<RouterStateUrl>;
}