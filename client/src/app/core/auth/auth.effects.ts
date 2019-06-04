import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';

import {
  ActionAuthCheckLogin,
  ActionAuthLogin,
  ActionAuthLoginComplete,
  ActionAuthLoginFailure,
  ActionAuthLoginSuccess,
  ActionAuthLogout,
  AuthActionTypes
} from './auth.actions';
import {empty, Observable, of} from 'rxjs';
import {AuthService} from '@app/core/auth/auth.service';

@Injectable()
export class AuthEffects {

  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<ActionAuthLogin>(AuthActionTypes.LOGIN),
    tap(() => {
      this.authService.login();
    })
  );

  @Effect()
  loginComplete$: Observable<ActionAuthLoginSuccess | ActionAuthLoginFailure> = this.actions$.pipe(
    ofType<ActionAuthLoginComplete>(AuthActionTypes.LOGIN_COMPLETE),
    exhaustMap(() => {
      return this.authService.parseHash$().pipe(
        map((authResult: any) => {
          if (authResult && authResult.idToken) {
            this.authService.setAuth(authResult.idToken);
            return new ActionAuthLoginSuccess();
          } else {
            return new ActionAuthLoginFailure('Missing Access Token');
          }
        }),
        catchError(error => of(new ActionAuthLoginFailure(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType<ActionAuthLoginSuccess>(AuthActionTypes.LOGIN_SUCCESS),
    tap(() => this.router.navigate(['']))
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
      return this.router.navigate(['home']);
    })
  );

  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType<ActionAuthLogout>(AuthActionTypes.LOGOUT),
    tap(() => {
      this.authService.logout();
    })
  );

  @Effect()
  checkLogin$ = this.actions$.pipe(
    ofType<ActionAuthCheckLogin>(AuthActionTypes.CHECK_LOGIN),
    exhaustMap(() => {
      if (this.authService.authenticated) {
        return of(new ActionAuthLoginSuccess());
        // return this.authService.checkSession$({}).pipe(
        //   map((authResult: any) => {
        //     if (authResult && authResult.idToken) {
        //       this.authService.setAuth(authResult.idToken);
        //       return new ActionAuthLoginSuccess();
        //     } else {
        //       return new ActionAuthLoginFailure('Missing Access Token');
        //     }
        //   }),
        //   catchError(error => of(new ActionAuthLoginFailure({ error })))
        // );
      } else {
        return empty();
      }
    })
  );

  constructor(
    private actions$: Actions<Action>,
    private router: Router,
    private authService: AuthService
  ) {
  }
}
