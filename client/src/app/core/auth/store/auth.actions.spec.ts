import * as AuthActions from './auth.actions';

describe('Auth Actions', () => {
  const payload = { redirectUrl: 'url' };
  const error = { errorMessage: 'Error' };

  it('should create loginSuccess action', () => {
    const action = AuthActions.loginSuccess(payload);
    expect(action).toEqual({
      ...payload,
      type: action.type
    });
  });

  it('should create loginFailure action', () => {
    const action = AuthActions.loginFailure({ error });
    expect(action).toEqual({
      ...{ error },
      type: action.type
    });
  });

  it('should create checkLogin action', () => {
    const action = AuthActions.checkLogin(payload);
    expect(action.redirectUrl).toBe(payload.redirectUrl);
  });

  it('should create login action', () => {
    const action = AuthActions.login();
    expect(action).toBeDefined();
  });

  it('should create loginComplete action', () => {
    const action = AuthActions.loginComplete();
    expect(action).toBeDefined();
  });

  it('should create logout action', () => {
    const action = AuthActions.logout();
    expect(action).toBeDefined();
  });
});
