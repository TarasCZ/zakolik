import {
  AuthActionTypes,
  ActionAuthLogin,
  ActionAuthLogout
} from './auth.actions';

describe('Auth Actions', () => {
  it('should upsert ActionAuthLogin action', () => {
    const action = new ActionAuthLogin();
    expect(action.type).toEqual(AuthActionTypes.LOGIN);
  });

  it('should upsert ActionAuthLogout action', () => {
    const action = new ActionAuthLogout();
    expect(action.type).toEqual(AuthActionTypes.LOGOUT);
  });
});
