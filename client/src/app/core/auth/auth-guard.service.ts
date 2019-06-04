import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';

import * as fromAuth from './auth.selectors';
import {AppState} from '../core.state';
import {map, mergeMap, take} from 'rxjs/operators';
import {AuthService} from '@app/core/auth/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<AppState>, private authService: AuthService, private router: Router) {
  }

  canActivate() {
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
    return this.store.select(fromAuth.selectIsAuthenticated).pipe(take(1));
  }

  checkApiAuthentication() {
    return of(this.authService.authenticated);
  }
}

