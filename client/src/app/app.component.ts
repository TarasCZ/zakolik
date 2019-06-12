import browser from 'browser-detect';
import {Component, OnInit} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs';

import {
  ActionAuthLogout,
  routeAnimations,
  AppState,
  selectIsAuthenticated, LocalStorageService, ActionAuthCheckLogin
} from '@app/core';
import {environment as env} from '@env/environment';

import {
  ActionSettingsChangeLanguage,
  ActionSettingsChangeAnimationsPageDisabled,
  selectEffectiveTheme,
  selectSettingsLanguage,
  selectSettingsStickyHeader
} from './settings';
import {Local} from 'protractor/built/driverProviders';

@Component({
  selector: 'zklk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../assets/logo.png');
  languages = ['en', 'cz', 'sk'];
  navigation = [
    { link: 'dashboard', label: 'zklk.menu.dashboard', disabled: true },
    { link: 'transactions', label: 'zklk.menu.transactions', disabled: false },
    { link: 'budgets', label: 'zklk.menu.budgets', disabled: true },
    { link: 'goals', label: 'zklk.menu.goals', disabled: true }
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'zklk.menu.settings' }
  ];

  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private localStorageService: LocalStorageService
  ) {
  }

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.localStorageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        new ActionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }

    this.store.dispatch(new ActionAuthCheckLogin({ redirectUrl: window.location.pathname }));
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
  }

  onLogoutClick() {
    this.store.dispatch(new ActionAuthLogout());
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new ActionSettingsChangeLanguage({ language }));
  }
}
