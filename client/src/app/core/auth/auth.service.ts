import {WebAuth} from 'auth0-js';
import {bindNodeCallback} from 'rxjs';
import {LocalStorageService} from '../local-storage/local-storage.service';
import * as uuid from 'uuid'


export class AuthService {
  private accessToken: string | null = null;
  private idToken: string | null = null;
  private expiresAt: number | null = null;

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
    return true;
    // return JSON.parse(this.localStorageService.getItem('isAuthenticated'));
  }

  login() {
    const nonce = '123';

    LocalStorageService.setItem('state', nonce);
    this.auth0.authorize({state: nonce, nonce: nonce});
  }

  setSession(authResult: any) {
    // Set the time that the Access Token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // navigate to the home route
    // window.location.replace('/home');
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
      }
    });
  }

  logout() {
  }

  setAuth(authResult) {
    console.log(authResult);
    // this.localStorageService.setItem('AuthResult', authResult);
  }
}
