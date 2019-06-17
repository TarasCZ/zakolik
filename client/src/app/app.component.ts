import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import {
  ActionAuthCheckLogin,
  ActionAuthLogout,
  AppState,
  LocalStorageService,
  routeAnimations,
  selectIsAuthenticated
} from '@app/core';
import { environment as env } from '@env/environment';

import {
  ActionSettingsChangeAnimationsPageDisabled,
  ActionSettingsChangeLanguage,
  selectPicture,
  selectSettingsLanguage,
  selectSettingsStickyHeader,
  selectTheme
} from './settings';
import { Observable } from 'rxjs';

@Component({
  selector: 'zklk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
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
      protected: this.isAuthenticated$,
      icon: 'tachometer-alt'
    },
    {
      link: 'transactions',
      label: 'zklk.menu.transactions',
      disabled: false,
      protected: this.isAuthenticated$,
      icon: 'bars'
    },
    {
      link: 'budgets',
      label: 'zklk.menu.budgets',
      disabled: true,
      protected: this.isAuthenticated$,
      icon: 'chart-pie'
    },
    {
      link: 'goals',
      label: 'zklk.menu.goals',
      disabled: true,
      protected: this.isAuthenticated$,
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
    private localStorageService: LocalStorageService
  ) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.localStorageService.testLocalStorage();

    const pageAnimationsDisabled = AppComponent.isIEorEdgeOrSafari();
    this.store.dispatch(
      new ActionSettingsChangeAnimationsPageDisabled({ pageAnimationsDisabled })
    );

    this.store.dispatch(
      new ActionAuthCheckLogin({ redirectUrl: window.location.pathname })
    );
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.profile$ = this.store.pipe(select(selectPicture));
    this.theme$ = this.store.pipe(select(selectTheme));
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new ActionSettingsChangeLanguage({ language }));
  }
}
