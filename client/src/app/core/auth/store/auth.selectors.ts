import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '../../core.state';
import { AuthState } from './auth.models';

export const selectAuthState = createFeatureSelector<AppState, AuthState>(
  'auth'
);

export const selectAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);
