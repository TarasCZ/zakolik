import { Action, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { environment } from '@env/environment';

import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { debug } from './meta-reducers/debug.reducer';
import { AuthState } from './auth/store/auth.models';
import { authReducer } from './auth/store/auth.reducer';
import { RouterStateUrl } from './router/router.state';
import { UiState } from '@app/core/ui/ui.state';
import { uiReducer } from '@app/core/ui/ui.reducer';
import { InjectionToken } from '@angular/core';

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<AppState, Action>
>('Root reducers token', {
  factory: () => ({
    auth: authReducer,
    router: routerReducer,
    ui: uiReducer
  })
});

export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromLocalStorage
];
if (!environment.test) {
  metaReducers.unshift(debug);
}

export interface AppState {
  auth: AuthState;
  router: RouterReducerState<RouterStateUrl>;
  ui: UiState;
}
