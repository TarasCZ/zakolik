import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { environment } from '@env/environment';

import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { debug } from './meta-reducers/debug.reducer';
import { AuthState } from './auth/store/auth.models';
import { authReducer } from './auth/store/auth.reducer';
import { RouterStateUrl } from './router/router.state';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromLocalStorage
];
if (!environment.test) {
  metaReducers.unshift(debug);
}

export const selectAuthState = createFeatureSelector<AppState, AuthState>(
  'auth'
);

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('router');

export interface AppState {
  auth: AuthState;
  router: RouterReducerState<RouterStateUrl>;
}
