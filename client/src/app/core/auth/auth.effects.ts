import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';

import {LocalStorageService} from '../local-storage/local-storage.service';

import {
  ActionAuthLogin, ActionAuthLoginComplete, ActionAuthLoginFailure, ActionAuthLoginSuccess,
  ActionAuthLogout,
  AuthActionTypes
} from './auth.actions';
import {Observable, of} from 'rxjs';
import {AuthService} from '@app/core/auth/auth.service';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {

  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<ActionAuthLogin>(AuthActionTypes.LOGIN),
    tap(() => {
      return this.authService.login();
    })
  );

  @Effect()
  loginComplete$: Observable<ActionAuthLoginSuccess | ActionAuthLoginFailure> = this.actions$.pipe(
    ofType<ActionAuthLoginComplete>(AuthActionTypes.LOGIN_COMPLETE),
    exhaustMap(() => {
      return this.authService.parseHash$().pipe(
        map((authResult: any) => {
          console.log('AUTH RESULT', authResult);
          if (authResult && authResult.accessToken) {
            this.authService.setAuth(authResult);
            window.location.hash = '';
            return new ActionAuthLoginSuccess();
          }
        }),
        catchError(error => of(new ActionAuthLoginFailure(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType<ActionAuthLoginSuccess>(AuthActionTypes.LOGIN_SUCCESS),
    tap(() => {
      this.router.navigate(['']);
    })
  );

  @Effect({ dispatch: false })
  loginErrorRedirect$ = this.actions$.pipe(
    ofType<ActionAuthLoginFailure>(AuthActionTypes.LOGIN_FAILURE),
    map(action => action.payload),
    tap((err: any) => {
      if (err.error_description) {
        console.error(`Error: ${err.error_description}`);
      } else {
        console.error(`Error: ${JSON.stringify(err)}`);
      }
      this.router.navigate(['/login']);
    })
  );

  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType<ActionAuthLogout>(AuthActionTypes.LOGOUT),
    tap(() => {
      this.router.navigate(['login']);
      this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false, accessToken: null });
    })
  );

  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private router: Router,
    private authService: AuthService
  ) {
  }
}
