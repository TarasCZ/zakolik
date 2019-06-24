import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login');

export const loginComplete = createAction('[Auth] Login Complete');

export const loginSuccess = createAction(
  '[Auth] Login Success',
  ({ redirectUrl }): { redirectUrl: string } => ({ redirectUrl })
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error }>()
);

export const logout = createAction('[Auth] Logout');

export const checkLogin = createAction(
  '[Auth] Check Login',
  ({ redirectUrl }): { redirectUrl: string } => ({ redirectUrl })
);
