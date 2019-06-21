import { OverlayContainer } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { of, ReplaySubject } from 'rxjs';

import {
  ActionAuthLoginSuccess,
  AnimationsService,
  LocalStorageService,
  TitleService
} from '@app/core';

import { SETTINGS_KEY, SettingsEffects } from './settings.effects';
import { SettingsState, State } from './settings.model';
import {
  ActionSettingsChangeAnimationsElements,
  ActionSettingsChangeAnimationsPage,
  ActionSettingsChangeLanguage,
  ActionSettingsChangeStickyHeader,
  ActionSettingsChangeTheme,
  ActionSettingsLoadAll
} from './settings.actions';
import { createSpyObj, MockStore, provideMockStore } from '@testing/utils.spec';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SettingsDataService } from '@app/settings/services/settings-data.service';
import { first } from 'rxjs/operators';

describe('SettingsEffects', () => {
  const isNotInitTrigger = val => val[0].type !== 'zklk-init-effect-trigger';
  const settings: SettingsState = {
    language: 'en',
    theme: 'default-theme',
    stickyHeader: false,
    pageAnimations: false,
    pageAnimationsDisabled: true,
    elementsAnimations: false,
    picture: 'pictureUrl'
  };

  let settingsEffects: SettingsEffects;
  let settingsDataService;
  let router: any;
  let actions;
  let localStorageService;
  let overlayContainer;
  let titleService;
  let animationsService;
  let translateService;
  let store: MockStore<State>;

  beforeEach(() => {
    actions = new ReplaySubject(2);
    router = {
      routerState: {
        snapshot: {}
      },
      events: {
        pipe() {}
      }
    };
    settingsDataService = createSpyObj('SettingsDataService', [
      'getAllSettings',
      'updateAllSettings'
    ]);
    localStorageService = createSpyObj('LocalStorageService', ['setItem']);
    overlayContainer = createSpyObj('OverlayContainer', [
      'getContainerElement'
    ]);
    titleService = createSpyObj('TitleService', ['setTitle']);
    animationsService = createSpyObj('AnimationsService', [
      'updateRouteAnimationType'
    ]);
    translateService = createSpyObj('TranslateService', ['use']);

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        SettingsEffects,
        provideMockStore(),
        { provide: Actions, useValue: actions },
        { provide: Router, useValue: router },
        { provide: LocalStorageService, useValue: localStorageService },
        { provide: OverlayContainer, useValue: overlayContainer },
        { provide: TitleService, useValue: titleService },
        { provide: AnimationsService, useValue: animationsService },
        { provide: TranslateService, useValue: translateService },
        { provide: SettingsDataService, useValue: settingsDataService }
      ]
    });

    store = TestBed.get(Store);
    store.setState({
      auth: {
        isAuthenticated: false
      },
      settings: { ...settings }
    });
    settingsEffects = TestBed.get<SettingsEffects>(SettingsEffects);
  });

  describe('loadSettings', () => {
    beforeEach(() => {
      settingsDataService.getAllSettings.mockReturnValue(of(settings));
      actions.next(new ActionAuthLoginSuccess());
    });

    it('should be able to dispatch any action', () => {
      const metadata = getEffectsMetadata(settingsEffects);

      expect(metadata.loadSettings$).toEqual({ dispatch: true });
    });

    it('should setItem on localStorageService', done => {
      settingsEffects.loadSettings$.subscribe(() => {
        expect(localStorageService.setItem).toHaveBeenCalledWith(
          SETTINGS_KEY,
          settings
        );
        done();
      });
    });

    it('should return LoadAll Action', done => {
      settingsEffects.loadSettings$.subscribe(action => {
        expect(action).toEqual(new ActionSettingsLoadAll(settings));
        done();
      });
    });
  });

  describe('persistSettings', () => {
    const possibleChangeActions = [
      new ActionSettingsChangeAnimationsElements({ elementsAnimations: true }),
      new ActionSettingsChangeAnimationsPage({ pageAnimations: true }),
      new ActionSettingsChangeLanguage({ language: 'cz' }),
      new ActionSettingsChangeStickyHeader({ stickyHeader: true }),
      new ActionSettingsChangeTheme({ theme: 'dark' })
    ];

    beforeEach(() =>
      settingsDataService.updateAllSettings.mockReturnValue(of({}))
    );

    it('should not dispatch any action', () => {
      const metadata = getEffectsMetadata(settingsEffects);

      expect(metadata.persistSettings$).toEqual({ dispatch: false });
    });

    describe('for every possible action when not authenticated', () => {
      possibleChangeActions.forEach(action => {
        describe(`when ${action.type.substr(11)} is dispatched`, () => {
          beforeEach(() => actions.next(action));

          it('should save settings to local storage', done => {
            settingsEffects.persistSettings$.subscribe(() => {
              expect(localStorageService.setItem).toHaveBeenCalledWith(
                SETTINGS_KEY,
                { ...settings, ...action.payload }
              );
              done();
            });
          });

          it('should not pass settings to the data service', done => {
            settingsEffects.persistSettings$.subscribe(() => {
              expect(
                settingsDataService.updateAllSettings
              ).not.toHaveBeenCalled();
              done();
            });
          });
        });
      });
    });

    describe('for every possible action when authenticated', () => {
      possibleChangeActions.forEach(action => {
        describe(`when ${action.type.substr(11)} is dispatched`, () => {
          beforeEach(() => {
            store.setState({
              auth: { isAuthenticated: true },
              settings
            });
            actions.next(action);
          });

          it('should save settings to local storage', done => {
            settingsEffects.persistSettings$.subscribe(() => {
              expect(localStorageService.setItem).toHaveBeenCalledWith(
                SETTINGS_KEY,
                { ...settings, ...action.payload }
              );
              done();
            });
          });

          it('should not pass settings to the data service', done => {
            settingsEffects.persistSettings$.subscribe(() => {
              expect(
                settingsDataService.updateAllSettings
              ).toHaveBeenCalledWith({ ...settings, ...action.payload });
              done();
            });
          });
        });
      });
    });
  });

  describe('updateRouteAnimationType', () => {
    it('should not dispatch any action', () => {
      const metadata = getEffectsMetadata(settingsEffects);

      expect(metadata.updateRouteAnimationType$).toEqual({ dispatch: false });
    });

    describe('when effect is initialized', () => {
      it('should pass state to updateRouteAnimationType on animationsService', done => {
        const { elementsAnimations, pageAnimations } = settings;
        settingsEffects.updateRouteAnimationType$.subscribe(() => {
          expect(
            animationsService.updateRouteAnimationType
          ).toHaveBeenCalledWith({
            elementsAnimations,
            pageAnimations
          });
          done();
        });
      });
    });

    describe('when change animations elements action is dispatched', () => {
      it('should updateRouteAnimationType on animationsService', done => {
        const actionPayload = { elementsAnimations: true };
        actions.next(new ActionSettingsChangeAnimationsElements(actionPayload));

        settingsEffects.updateRouteAnimationType$
          .pipe(first(isNotInitTrigger))
          .subscribe(() => {
            expect(
              animationsService.updateRouteAnimationType
            ).toHaveBeenCalledWith({
              pageAnimations: settings.pageAnimations,
              ...actionPayload
            });
            done();
          });
      });
    });

    describe('when change animations page action is dispatched', () => {
      it('should updateRouteAnimationType on animationsService', done => {
        const actionPayload = { pageAnimations: true };
        actions.next(new ActionSettingsChangeAnimationsPage(actionPayload));

        settingsEffects.updateRouteAnimationType$
          .pipe(first(isNotInitTrigger))
          .subscribe(() => {
            expect(
              animationsService.updateRouteAnimationType
            ).toHaveBeenCalledWith({
              elementsAnimations: settings.elementsAnimations,
              ...actionPayload
            });
            done();
          });
      });
    });
  });

  describe('updateTheme', () => {
    const actionPayload = { theme: 'dark-theme' };
    let classList;

    beforeEach(() => {
      classList = {
        0: 'innocent-value',
        1: 'guilty-theme',
        length: 2,
        add: jest.fn(),
        remove: jest.fn()
      };

      overlayContainer.getContainerElement.mockReturnValue({ classList });
      actions.next(new ActionSettingsChangeTheme(actionPayload));
    });

    it('should not dispatch any action', () => {
      const metadata = getEffectsMetadata(settingsEffects);

      expect(metadata.updateTheme$).toEqual({ dispatch: false });
    });

    describe('when effect is initialized', () => {
      it('should only remove theme from classList', done => {
        settingsEffects.updateTheme$.subscribe(() => {
          expect(classList.remove.mock.calls[0][0]).toEqual('guilty-theme');
          expect(classList[0]).toEqual('innocent-value');
          done();
        });
      });

      it('should add theme from state to the classList', done => {
        settingsEffects.updateTheme$.subscribe(() => {
          expect(classList.add.mock.calls[0][0]).toEqual(settings.theme);
          done();
        });
      });
    });

    describe('when change theme action is dispatched', () => {
      it('should only remove theme from classList', done => {
        settingsEffects.updateTheme$
          .pipe(first(isNotInitTrigger))
          .subscribe(() => {
            expect(classList.remove.mock.calls[1][0]).toEqual('guilty-theme');
            expect(classList[0]).toEqual('innocent-value');
            done();
          });
      });

      it('should add theme from state to the classList', done => {
        settingsEffects.updateTheme$
          .pipe(first(isNotInitTrigger))
          .subscribe(() => {
            console.log(settings.theme);
            expect(classList.add.mock.calls[1][0]).toEqual(actionPayload.theme);
            done();
          });
      });
    });
  });

  describe('setTranslateServiceLanguage', () => {
    it('should not dispatch any action', () => {
      const metadata = getEffectsMetadata(settingsEffects);

      expect(metadata.setTranslateServiceLanguage$).toEqual({
        dispatch: false
      });
    });

    it('should use language on translateService from the store', done => {
      settingsEffects.setTranslateServiceLanguage$.subscribe(() => {
        expect(translateService.use).toHaveBeenCalledWith(settings.language);
        done();
      });
    });
  });
});
