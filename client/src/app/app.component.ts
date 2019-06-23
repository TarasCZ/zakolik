import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import {
  AppState,
  AuthService,
  checkLogin,
  LocalStorageService,
  logout,
  routeAnimations,
  selectIsAuthenticated
} from '@app/core';
import { environment as env } from '@env/environment';

import {
  changeAnimationsPageDisabled,
  changeLanguage,
  selectPicture,
  selectSettingsLanguage,
  selectSettingsStickyHeader,
  selectTheme
} from './settings';
import { Observable } from 'rxjs';
import { selectIsLoading } from '@app/core/ui/ui.selectors';
import { showSpinner } from '@app/core/ui/ui.actions';

@Component({
  selector: 'zklk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  language$: Observable<string>;
  profile$: Observable<string>;
  theme$: Observable<string>;

  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../assets/logo.png');
  languages = ['en', 'cz', 'sk'];
  navigation = [
    {
      link: 'dashboard',
      label: 'zklk.menu.dashboard',
      disabled: true,
      icon: 'tachometer-alt'
    },
    {
      link: 'transactions',
      label: 'zklk.menu.transactions',
      disabled: false,
      icon: 'bars'
    },
    {
      link: 'budgets',
      label: 'zklk.menu.budgets',
      disabled: true,
      icon: 'chart-pie'
    },
    {
      link: 'goals',
      label: 'zklk.menu.goals',
      disabled: true,
      icon: 'flag-checkered'
    }
  ];
  navigationSideMenu = [
    ...this.navigation,
    {
      link: 'settings',
      label: 'zklk.menu.settings',
      disabled: false,
      icon: 'cog'
    }
  ];

  constructor(
    private store: Store<AppState>,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.localStorageService.testLocalStorage();

    this.checkLoginIfAuthenticated();

    const pageAnimationsDisabled = AppComponent.isIEorEdgeOrSafari();
    this.store.dispatch(
      changeAnimationsPageDisabled({ pageAnimationsDisabled })
    );

    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.profile$ = this.store.pipe(select(selectPicture));
    this.theme$ = this.store.pipe(select(selectTheme));
  }

  onLogoutClick() {
    this.store.dispatch(showSpinner());
    this.store.dispatch(logout());
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(changeLanguage({ language }));
  }

  private checkLoginIfAuthenticated() {
    if (this.authService.authenticated) {
      this.store.dispatch(
        checkLogin({ redirectUrl: window.location.pathname })
      );
    }
  }
}
