import { AuthState } from './auth.models';
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const initialState: AuthState = {
  isAuthenticated: false
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, state => ({ ...state, isAuthenticated: true })),
  on(AuthActions.logout, () => initialState)
);
