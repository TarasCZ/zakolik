import {WebAuth} from 'auth0-js';
import {bindNodeCallback} from 'rxjs';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

  private auth0 = new WebAuth({
    domain: 'dev-l2w-mks0.eu.auth0.com',
    clientID: 'jiyDt6vp21wmCl7WlnlLNhhPoAyMt41A',
    redirectUri: 'http://localhost:4200/callback',
    responseType: 'id_token',
  }); // Todo: move to env file

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
      returnTo: 'http://localhost:4200/',
      clientID: 'jiyDt6vp21wmCl7WlnlLNhhPoAyMt41A'
    });
  }

  setAuth(idToken) {
    this.localStorageService.setItem('accessToken', idToken);
    this.localStorageService.setItem('isAuthenticated', true);
  }
}
