import {
  AuthActionTypes,
  ActionAuthLogin,
  ActionAuthLogout,
  ActionAuthCheckLogin,
  ActionAuthLoginComplete,
  ActionAuthLoginFailure,
  ActionAuthLoginSuccess
} from './auth.actions';

describe('Auth Actions', () => {
  const payload = {
    redirectUrl: 'url'
  };

  it('should upsert ActionAuthLogin action', () => {
    const action = new ActionAuthLogin();
    expect(action.type).toEqual(AuthActionTypes.LOGIN);
  });

  it('should upsert ActionAuthLogout action', () => {
    const action = new ActionAuthLogout();
    expect(action.type).toEqual(AuthActionTypes.LOGOUT);
  });

  it('should upsert ActionAuthLoginSuccess action', () => {
    const action = new ActionAuthLoginSuccess();
    expect(action.type).toEqual(AuthActionTypes.LOGIN_SUCCESS);
  });

  it('should upsert ActionAuthLoginFailure action', () => {
    const error = { errorMessage: 'Error' };
    const action = new ActionAuthLoginFailure(error);
    expect(action.type).toEqual(AuthActionTypes.LOGIN_FAILURE);
    expect(action.payload).toEqual(error);
  });

  it('should upsert ActionAuthLoginComplete action', () => {
    const action = new ActionAuthLoginComplete();
    expect(action.type).toEqual(AuthActionTypes.LOGIN_COMPLETE);
  });

  it('should upsert ActionAuthCheckLogin action', () => {
    const action = new ActionAuthCheckLogin(payload);
    expect(action.type).toEqual(AuthActionTypes.CHECK_LOGIN);
    expect(action.payload.redirectUrl).toBe(payload.redirectUrl);
  });
});
