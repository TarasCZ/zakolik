import { Router } from '@angular/router';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { cold } from 'jasmine-marbles';
import { EMPTY } from 'rxjs';

import {
  LocalStorageService,
  ActionAuthLogin,
  ActionAuthLogout, AuthService
} from '@app/core';

import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let router: jasmine.SpyObj<Router>;
  let authService: AuthService;

  beforeEach(() => {
    localStorageService = jasmine.createSpyObj('LocalStorageService', [
      'setItem'
    ]);
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);
  });

  describe('login', () => {
    it('should not dispatch any action', () => {
      const actions = new Actions(EMPTY);
      const effect = new AuthEffects(actions, router, authService);
      const metadata = getEffectsMetadata(effect);

      expect(metadata.login$).toEqual({ dispatch: false });
    });

    it('should call setItem on LocalStorageService', () => {
      const loginAction = new ActionAuthLogin();
      const source = cold('a', { a: loginAction });
      const actions = new Actions(source);
      const effect = new AuthEffects(actions, router, authService);

      effect.login.subscribe(() => {
        expect(localStorageService.setItem).toHaveBeenCalledWith(AUTH_KEY, {
          isAuthenticated: true
        });
      });
    });
  });

  describe('logout', () => {
    it('should not dispatch any action', () => {
      const actions = new Actions(EMPTY);
      const effect = new AuthEffects(actions, router, authService);
      const metadata = getEffectsMetadata(effect);

      expect(metadata.logout).toEqual({ dispatch: false });
    });

    it('should call setItem on LocalStorageService and navigate to about', () => {
      const logoutAction = new ActionAuthLogout();
      const source = cold('a', { a: logoutAction });
      const actions = new Actions(source);
      const effect = new AuthEffects(actions, localStorageService, router);

      effect.login.subscribe(() => {
        expect(localStorageService.setItem).toHaveBeenCalledWith(AUTH_KEY, {
          isAuthenticated: false
        });
        expect(router.navigate).toHaveBeenCalledWith(['']);
      });
    });
  });
});
