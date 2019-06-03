import {WebAuth} from 'auth0-js';
import {bindNodeCallback} from 'rxjs';
import {LocalStorageService} from '../local-storage/local-storage.service';


export class AuthService {

  private auth0 = new WebAuth({
    domain: 'dev-l2w-mks0.eu.auth0.com',
    clientID: 'jiyDt6vp21wmCl7WlnlLNhhPoAyMt41A',
    redirectUri: 'http://localhost:4200/callback',
    responseType: 'id_token',
  });

  parseHash$ = bindNodeCallback(this.auth0.parseHash.bind(this.auth0));
  checkSession$ = bindNodeCallback(this.auth0.checkSession.bind(this.auth0));


  constructor() {
  }

  get authenticated(): boolean {
    return LocalStorageService.getItem('isAuthenticated');
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    LocalStorageService.removeItem('accessToken');
    LocalStorageService.setItem('isAuthenticated', false);
    this.auth0.logout({
      returnTo: 'http://localhost:4200/',
      clientID: 'jiyDt6vp21wmCl7WlnlLNhhPoAyMt41A'
    });
  }

  setAuth(idToken) {
    LocalStorageService.setItem('accessToken', idToken);
    LocalStorageService.setItem('isAuthenticated', true);
  }
}
