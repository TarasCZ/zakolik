import { TestBed } from '@angular/core/testing';
import { WebAuth } from 'auth0-js';
import { AuthService, LocalStorageService } from '@app/core';

describe('Auth Service', () => {
  const IS_AUTHENTICATED_KEY = 'isAuthenticated';
  const ACCESS_TOKEN_KEY = 'accessToken';
  const authenticatedTrue = true;
  const webAuthMock = {
    authorize: jest.fn(),
    logout: jest.fn(),
    parseHash: jest.fn().mockImplementation((value, cb) => cb(null, value)),
    checkSession: jest.fn().mockImplementation((value, cb) => cb(null, value))
  };
  const localStorageServiceMock = {
    getItem: jest.fn().mockReturnValue(authenticatedTrue),
    setItem: jest.fn(),
    removeItem: jest.fn()
  };

  let authService: AuthService;
  let webAuth: WebAuth;
  let localStorageService: LocalStorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: WebAuth, useValue: webAuthMock },
        { provide: LocalStorageService, useValue: localStorageServiceMock }
      ]
    });

    authService = TestBed.get<AuthService>(AuthService);
    webAuth = TestBed.get<WebAuth>(WebAuth);
    localStorageService = TestBed.get<LocalStorageService>(LocalStorageService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should return authenticated as true', () => {
    expect(authService.authenticated).toEqual(authenticatedTrue);
  });

  it('should call authenticate when login', () => {
    authService.login();
    expect(webAuth.authorize).toHaveBeenCalledTimes(1);
  });

  it('should parseHash', async () => {
    const value = 'hash';
    expect(await authService.parseHash$(value).toPromise()).toEqual(value);
  });

  it('should checkSession', async () => {
    const value = 'session';
    expect(await authService.checkSession$(value).toPromise()).toEqual(value);
  });

  describe('when logout', () => {
    beforeEach(() => authService.logout());

    it('should call logout method', () => {
      expect(webAuth.logout).toHaveBeenCalledTimes(1);
    });

    it('should set localStorage isAuthenticated to false', () => {
      expect(localStorageService.setItem).toHaveBeenCalledWith(
        IS_AUTHENTICATED_KEY,
        false
      );
    });

    it('should remove localStorage accessToken', () => {
      expect(localStorageService.removeItem).toHaveBeenCalledWith(
        ACCESS_TOKEN_KEY
      );
    });
  });

  describe('when authentication token is set', () => {
    const token = 'token';

    beforeEach(() => authService.setAuth(token));

    it('should set localStorage accessToken', () => {
      expect(localStorageService.setItem).toHaveBeenCalledWith(
        ACCESS_TOKEN_KEY,
        token
      );
    });

    it('should set localStorage isAuthenticated to true', () => {
      expect(localStorageService.setItem).toHaveBeenCalledWith(
        IS_AUTHENTICATED_KEY,
        true
      );
    });
  });
});
