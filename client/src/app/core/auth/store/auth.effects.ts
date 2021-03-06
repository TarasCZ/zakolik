import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { of } from 'rxjs';
import { AuthService } from '@app/core/auth/auth.service';
import { hideSpinner } from '@app/core/ui/ui.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap(() => {
          this.authService.login();
        })
      ),
    { dispatch: false }
  );

  loginComplete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginComplete),
      exhaustMap(() => {
        return this.authService.parseHash$().pipe(
          map((authResult: any) => {
            if (authResult && authResult.idToken) {
              this.authService.setAuth(authResult.idToken);
              return AuthActions.loginSuccess({ redirectUrl: '' });
            } else {
              return AuthActions.loginFailure({
                error: 'Missing Access Token'
              });
            }
          }),
          catchError(error => of(AuthActions.loginFailure({ error })))
        );
      })
    )
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ redirectUrl }) => this.router.navigate([redirectUrl]))
      ),
    { dispatch: false }
  );

  loginErrorRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        exhaustMap(({ error }) => {
          this.router.navigate(['']);
          if (typeof error === 'string') {
            return of(new Error(error));
          } else if (error.error_description) {
            return of(new Error(error.error_description));
          } else {
            return of(new Error(JSON.stringify(error)));
          }
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
        })
      ),
    { dispatch: false }
  );

  checkLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkLogin),
      exhaustMap(({ redirectUrl }) => {
        return this.authService.checkSession$({}).pipe(
          map((authResult: any) => {
            if (authResult && authResult.idToken) {
              this.authService.setAuth(authResult.idToken);
              return AuthActions.loginSuccess({ redirectUrl });
            } else {
              return AuthActions.loginFailure({
                error: 'Missing Access Token'
              });
            }
          }),
          catchError(error => {
            return of(AuthActions.loginFailure({ error }));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions<Action>,
    private router: Router,
    private authService: AuthService
  ) {}
}
