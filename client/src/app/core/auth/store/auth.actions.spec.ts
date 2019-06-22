import * as AuthActions from './auth.actions';

describe('Auth Actions', () => {
  const payload = {
    redirectUrl: 'url'
  };

  it('should upsert ActionAuthLoginFailure action', () => {
    const error = { errorMessage: 'Error' };
    const action = AuthActions.loginFailure(error);
    expect(action).toEqual({
      ...error,
      type: action.type
    });
  });

  it('should upsert ActionAuthCheckLogin action', () => {
    const action = AuthActions.checkLogin(payload);
    expect(action.redirectUrl).toBe(payload.redirectUrl);
  });
});
