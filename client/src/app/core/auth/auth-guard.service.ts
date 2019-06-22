import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromAuth from './store/auth.selectors';
import { AppState } from '../core.state';
import { first, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '@app/core/auth/auth.service';

@Injectable()
export class AuthGuardService implements CanLoad {
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {}

  canLoad() {
    return this.checkStoreAuthentication().pipe(
      mergeMap(storeAuth => {
        if (storeAuth) {
          return of(true);
        }

        return this.checkApiAuthentication();
      }),
      map(storeOrApiAuth => {
        if (!storeOrApiAuth) {
          this.router.navigate(['/home']);
          return false;
        }

        return true;
      })
    );
  }

  checkStoreAuthentication() {
    return this.store.select(fromAuth.selectIsAuthenticated).pipe(first());
  }

  checkApiAuthentication() {
    return of(this.authService.authenticated);
  }
}
