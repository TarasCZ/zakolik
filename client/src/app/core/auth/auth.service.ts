import {WebAuth} from 'auth0-js';
import {bindNodeCallback} from 'rxjs';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';

@Injectable()
export class AuthService {

  private auth0 = new WebAuth(environment.auth0Config);

  parseHash$ = bindNodeCallback(this.auth0.parseHash.bind(this.auth0));
  checkSession$ = bindNodeCallback(this.auth0.checkSession.bind(this.auth0));

  constructor(private localStorageService: LocalStorageService) {
  }

  get authenticated(): boolean {
    return this.localStorageService.getItem('isAuthenticated');
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    this.localStorageService.removeItem('accessToken');
    this.localStorageService.setItem('isAuthenticated', false);
    this.auth0.logout({
      returnTo: environment.appUrl,
      clientID: environment.auth0Config.clientID
    });
  }

  setAuth(idToken) {
    this.localStorageService.setItem('accessToken', idToken);
    this.localStorageService.setItem('isAuthenticated', true);
  }
}
