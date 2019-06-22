import { OverlayContainer } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { of, ReplaySubject } from 'rxjs';

import {
  AnimationsService,
  LocalStorageService,
  loginSuccess,
  TitleService
} from '@app/core';

import { SETTINGS_KEY, SettingsEffects } from './settings.effects';
import { SettingsState, State } from './settings.model';
import {
  changeAnimationsElements,
  changeAnimationsPage,
  changeLanguage,
  changeStickyHeader,
  changeTheme,
  loadAll
} from './settings.actions';
import { createSpyObj } from '@testing/utils.spec';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SettingsDataService } from '@app/settings/services/settings-data.service';
import { first } from 'rxjs/operators';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

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
  let store: MockStore<Partial<State>>;
  let metadata;

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
    metadata = getEffectsMetadata(settingsEffects);
  });

  describe('loadSettings', () => {
    beforeEach(() => {
      settingsDataService.getAllSettings.mockReturnValue(of(settings));
      actions.next(loginSuccess({ redirectUrl: '' }));
    });

    it(
      'should be able to dispatch any action',
      expectEffect('loadSettings$').toBeAbleToDispatchAction
    );

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
        expect(action).toEqual(loadAll(settings));
        done();
      });
    });
  });

  describe('persistSettings', () => {
    const possibleChangeActions = [
      changeAnimationsElements({ elementsAnimations: true }),
      changeAnimationsPage({ pageAnimations: true }),
      changeLanguage({ language: 'cz' }),
      changeStickyHeader({ stickyHeader: true }),
      changeTheme({ theme: 'dark' })
    ];

    beforeEach(() =>
      settingsDataService.updateAllSettings.mockReturnValue(of({}))
    );

    it(
      'should not dispatch any action',
      expectEffect('persistSettings$').not.toBeAbleToDispatchAction
    );

    describe('for every possible action when not authenticated', () => {
      possibleChangeActions.forEach(action => {
        describe(`when ${action.type.substr(11)} is dispatched`, () => {
          beforeEach(() => actions.next(action));

          it('should save settings to local storage', done => {
            const { type, ...payload } = action;
            settingsEffects.persistSettings$.subscribe(() => {
              expect(localStorageService.setItem).toHaveBeenCalledWith(
                SETTINGS_KEY,
                { ...settings, ...payload }
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
            const { type, ...payload } = action;
            settingsEffects.persistSettings$.subscribe(() => {
              expect(localStorageService.setItem).toHaveBeenCalledWith(
                SETTINGS_KEY,
                { ...settings, ...payload }
              );
              done();
            });
          });

          it('should not pass settings to the data service', done => {
            const { type, ...payload } = action;
            settingsEffects.persistSettings$.subscribe(() => {
              expect(
                settingsDataService.updateAllSettings
              ).toHaveBeenCalledWith({ ...settings, ...payload });
              done();
            });
          });
        });
      });
    });
  });

  describe('updateRouteAnimationType', () => {
    it(
      'should not dispatch any action',
      expectEffect('updateRouteAnimationType$').not.toBeAbleToDispatchAction
    );

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
        actions.next(changeAnimationsElements(actionPayload));

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
        actions.next(changeAnimationsPage(actionPayload));

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
      actions.next(changeTheme(actionPayload));
    });

    it(
      'should not dispatch any action',
      expectEffect('updateTheme$').not.toBeAbleToDispatchAction
    );

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
            expect(classList.add.mock.calls[1][0]).toEqual(actionPayload.theme);
            done();
          });
      });
    });
  });

  describe('setTranslateServiceLanguage', () => {
    it(
      'should not dispatch any action',
      expectEffect('setTranslateServiceLanguage$').not.toBeAbleToDispatchAction
    );

    it('should use language on translateService from the store', done => {
      settingsEffects.setTranslateServiceLanguage$.subscribe(() => {
        expect(translateService.use).toHaveBeenCalledWith(settings.language);
        done();
      });
    });
  });

  function expectEffect(effect: string) {
    return {
      toBeAbleToDispatchAction: () =>
        expect(metadata[effect]).toEqual({
          dispatch: true,
          resubscribeOnError: true
        }),
      not: {
        toBeAbleToDispatchAction: () =>
          expect(metadata[effect]).toEqual({
            dispatch: false,
            resubscribeOnError: true
          })
      }
    };
  }
});
