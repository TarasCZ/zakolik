import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';

import { AuthEffects } from './auth.effects';
import { TestBed } from '@angular/core/testing';
import { createSpyObj, expectEffectFactory } from '@testing/utils.spec';
import { of, ReplaySubject, throwError } from 'rxjs';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { AuthService } from '@app/core';

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
  let metadata;
  let expectEffect;

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
    metadata = getEffectsMetadata(authEffects);
    expectEffect = expectEffectFactory(metadata);
  });

  it('should be created', () => {
    expect(authEffects).toBeTruthy();
  });

  describe('login', () => {
    it('should not be able to dispatch any action', () =>
      expectEffect('login$').not.toBeAbleToDispatchAction());

    it('should call login on AuthService', done => {
      actions$.next(AuthActions.login());

      authEffects.login$.subscribe(() => {
        expect(authService.login).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  describe('loginComplete', () => {
    it('should be able to dispatch any action', () =>
      expectEffect('loginComplete$').toBeAbleToDispatchAction());

    it('should dispatch LoginSuccess Action', done => {
      authService.parseHash$.mockReturnValue(of({ idToken: 'idToken' }));

      actions$.next(AuthActions.loginComplete());

      authEffects.loginComplete$.subscribe(action => {
        expect(action).toEqual(AuthActions.loginSuccess({ redirectUrl: '' }));
        done();
      });
    });

    it('should dispatch LoginFailure Action when token is missing', done => {
      authService.parseHash$.mockReturnValue(of({}));

      actions$.next(AuthActions.loginComplete());

      authEffects.loginComplete$.subscribe(action => {
        expect(action).toEqual(
          AuthActions.loginFailure('Missing Access Token')
        );
        done();
      });
    });

    it('should dispatch LoginFailure Action when error occured', done => {
      const expectedError = new Error('Expected error');
      authService.parseHash$.mockReturnValue(throwError(expectedError));

      actions$.next(AuthActions.loginComplete());

      authEffects.loginComplete$.subscribe(action => {
        expect(action).toEqual(
          AuthActions.loginFailure({ error: expectedError })
        );
        done();
      });
    });
  });

  describe('loginRedirect', () => {
    it('should not be able to dispatch any action', () =>
      expectEffect('loginRedirect$').not.toBeAbleToDispatchAction());

    it('should call login on AuthService', done => {
      const redirectUrl = 'redirectUrl';
      actions$.next(AuthActions.loginSuccess({ redirectUrl }));

      authEffects.loginRedirect$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith([redirectUrl]);
        done();
      });
    });
  });

  describe('loginErrorRedirect', () => {
    it('should not be able to dispatch any action', () =>
      expectEffect('loginErrorRedirect$').not.toBeAbleToDispatchAction());

    it('should navigate to root', done => {
      const redirectUrl = '';
      actions$.next(AuthActions.loginFailure('testing error'));

      authEffects.loginErrorRedirect$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith([redirectUrl]);
        done();
      });
    });
  });

  describe('logout', () => {
    it('should not be able to dispatch any action', () =>
      expectEffect('logout$').not.toBeAbleToDispatchAction());

    it('should call setItem on LocalStorageService and navigate to about', done => {
      actions$.next(AuthActions.logout());

      authEffects.logout$.subscribe(() => {
        expect(authService.logout).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  describe('checkLogin', () => {
    const redirectUrl = 'redirectUrl';

    beforeEach(() => (authService.authenticated = true));

    it('should be able to dispatch any action', () =>
      expectEffect('checkLogin$').toBeAbleToDispatchAction());

    it('should dispatch LoginSuccess Action with redirectUrl', done => {
      authService.checkSession$.mockReturnValue(of({ idToken: 'idToken' }));

      actions$.next(AuthActions.checkLogin({ redirectUrl }));

      authEffects.checkLogin$.subscribe(action => {
        expect(action).toEqual(AuthActions.loginSuccess({ redirectUrl }));
        done();
      });
    });

    it('should dispatch call setAuth on atuhService with idToken parameter', done => {
      const idToken = 'idToken';
      authService.checkSession$.mockReturnValue(of({ idToken }));

      actions$.next(AuthActions.checkLogin({ redirectUrl }));

      authEffects.checkLogin$.subscribe(() => {
        expect(authService.setAuth).toHaveBeenCalledWith(idToken);
        done();
      });
    });

    it('should dispatch LoginFailure Action when token is missing', done => {
      authService.checkSession$.mockReturnValue(of({}));

      actions$.next(AuthActions.checkLogin({ redirectUrl }));

      authEffects.checkLogin$.subscribe(action => {
        expect(action).toEqual(
          AuthActions.loginFailure('Missing Access Token')
        );
        done();
      });
    });

    it('should dispatch LoginFailure Action when error occured', done => {
      const expectedError = new Error('Expected error');
      authService.checkSession$.mockReturnValue(throwError(expectedError));

      actions$.next(AuthActions.checkLogin({ redirectUrl }));

      authEffects.checkLogin$.subscribe(action => {
        expect(action).toEqual(
          AuthActions.loginFailure({ error: expectedError })
        );
        done();
      });
    });
  });
});
