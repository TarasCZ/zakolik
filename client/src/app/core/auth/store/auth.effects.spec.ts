import { Router } from '@angular/router';

import {
  ActionAuthCheckLogin,
  ActionAuthLogin,
  ActionAuthLoginComplete,
  ActionAuthLoginFailure,
  ActionAuthLoginSuccess,
  ActionAuthLogout,
  AuthService
} from '@app/core';

import { AuthEffects } from './auth.effects';
import { TestBed } from '@angular/core/testing';
import { createSpyObj } from '@testing/utils.spec';
import { of, ReplaySubject, throwError } from 'rxjs';
import { Actions, getEffectsMetadata } from '@ngrx/effects';

describe('AuthEffects', () => {
  const routerMock = createSpyObj('Router', ['navigate']);
  const authServiceMock = createSpyObj('AuthService', [
    'login',
    'logout',
    'setAuth',
    'checkSession$',
    'parseHash$'
  ]);

  let actions$;
  let router;
  let authService;
  let authEffects;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        { provide: Actions, useValue: actions$ },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    router = TestBed.get<Router>(Router);
    authService = TestBed.get<AuthService>(AuthService);
    authEffects = TestBed.get<AuthEffects>(AuthEffects);
  });

  it('should be created', () => {
    expect(authEffects).toBeTruthy();
  });

  describe('login', () => {
    it('should not dispatch any action', () => {
      const metadata = getEffectsMetadata(authEffects);

      expect(metadata.login$).toEqual({ dispatch: false });
    });

    it('should call login on AuthService', done => {
      actions$.next(new ActionAuthLogin());

      authEffects.login$.subscribe(() => {
        expect(authService.login).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  describe('loginComplete', () => {
    it('should be able to dispatch any action', () => {
      const metadata = getEffectsMetadata(authEffects);

      expect(metadata.loginComplete$).toEqual({ dispatch: true });
    });

    it('should dispatch LoginSuccess Action', done => {
      authService.parseHash$.mockReturnValue(of({ idToken: 'idToken' }));

      actions$.next(new ActionAuthLoginComplete());

      authEffects.loginComplete$.subscribe(action => {
        expect(action).toEqual(new ActionAuthLoginSuccess());
        done();
      });
    });

    it('should dispatch LoginFailure Action when token is missing', done => {
      authService.parseHash$.mockReturnValue(of({}));

      actions$.next(new ActionAuthLoginComplete());

      authEffects.loginComplete$.subscribe(action => {
        expect(action).toEqual(
          new ActionAuthLoginFailure('Missing Access Token')
        );
        done();
      });
    });

    it('should dispatch LoginFailure Action when error occured', done => {
      const expectedError = new Error('Expected error');
      authService.parseHash$.mockReturnValue(throwError(expectedError));

      actions$.next(new ActionAuthLoginComplete());

      authEffects.loginComplete$.subscribe(action => {
        expect(action).toEqual(
          new ActionAuthLoginFailure({ error: expectedError })
        );
        done();
      });
    });
  });

  describe('loginRedirect', () => {
    it('should not dispatch any action', () => {
      const metadata = getEffectsMetadata(authEffects);

      expect(metadata.loginRedirect$).toEqual({ dispatch: false });
    });

    it('should call login on AuthService', done => {
      const redirectUrl = 'redirectUrl';
      actions$.next(new ActionAuthLoginSuccess({ redirectUrl }));

      authEffects.loginRedirect$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith([redirectUrl]);
        done();
      });
    });
  });

  describe('loginErrorRedirect', () => {
    it('should not dispatch any action', () => {
      const metadata = getEffectsMetadata(authEffects);

      expect(metadata.loginErrorRedirect$).toEqual({ dispatch: false });
    });

    it('should navigate to root', done => {
      const redirectUrl = '';
      actions$.next(new ActionAuthLoginFailure('testing error'));

      authEffects.loginErrorRedirect$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith([redirectUrl]);
        done();
      });
    });
  });

  describe('logout', () => {
    it('should not dispatch any action', () => {
      const metadata = getEffectsMetadata(authEffects);

      expect(metadata.logout$).toEqual({ dispatch: false });
    });

    it('should call setItem on LocalStorageService and navigate to about', done => {
      actions$.next(new ActionAuthLogout());

      authEffects.logout$.subscribe(() => {
        expect(authService.logout).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  describe('checkLogin', () => {
    const redirectUrl = 'redirectUrl';

    beforeEach(() => (authService.authenticated = true));

    it('should be able to dispatch any action', () => {
      const metadata = getEffectsMetadata(authEffects);

      expect(metadata.checkLogin$).toEqual({ dispatch: true });
    });

    it('should dispatch LoginSuccess Action with redirectUrl', done => {
      authService.checkSession$.mockReturnValue(of({ idToken: 'idToken' }));

      actions$.next(new ActionAuthCheckLogin({ redirectUrl }));

      authEffects.checkLogin$.subscribe(action => {
        expect(action).toEqual(new ActionAuthLoginSuccess({ redirectUrl }));
        done();
      });
    });

    it('should dispatch call setAuth on atuhService with idToken parameter', done => {
      const idToken = 'idToken';
      authService.checkSession$.mockReturnValue(of({ idToken }));

      actions$.next(new ActionAuthCheckLogin({ redirectUrl }));

      authEffects.checkLogin$.subscribe(() => {
        expect(authService.setAuth).toHaveBeenCalledWith(idToken);
        done();
      });
    });

    it('should dispatch LoginFailure Action when token is missing', done => {
      authService.checkSession$.mockReturnValue(of({}));

      actions$.next(new ActionAuthCheckLogin({ redirectUrl }));

      authEffects.checkLogin$.subscribe(action => {
        expect(action).toEqual(
          new ActionAuthLoginFailure('Missing Access Token')
        );
        done();
      });
    });

    it('should dispatch LoginFailure Action when error occured', done => {
      const expectedError = new Error('Expected error');
      authService.checkSession$.mockReturnValue(throwError(expectedError));

      actions$.next(new ActionAuthCheckLogin({ redirectUrl }));

      authEffects.checkLogin$.subscribe(action => {
        expect(action).toEqual(
          new ActionAuthLoginFailure({ error: expectedError })
        );
        done();
      });
    });
  });
});
