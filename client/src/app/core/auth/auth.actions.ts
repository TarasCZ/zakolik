import {Action} from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_COMPLETE = '[Auth] Login Complete',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[Auth] Logout',
  CHECK_LOGIN = '[Auth] Check Login',
}

export class ActionAuthLogin implements Action {
  readonly type = AuthActionTypes.LOGIN;
}

export class ActionAuthLoginComplete implements Action {
  readonly type = AuthActionTypes.LOGIN_COMPLETE;
}

export class ActionAuthLoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
}

export class ActionAuthLoginFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;

  constructor(readonly payload: any) {
  }
}

export class ActionAuthLogout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class ActionAuthCheckLogin implements Action {
  readonly type = AuthActionTypes.CHECK_LOGIN
}

export type AuthActions =
  ActionAuthLogin |
  ActionAuthLoginComplete |
  ActionAuthLoginSuccess |
  ActionAuthLoginFailure |
  ActionAuthLogout |
  ActionAuthCheckLogin;
