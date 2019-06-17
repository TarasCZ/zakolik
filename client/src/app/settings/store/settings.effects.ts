import { ActivationEnd, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { merge, of } from 'rxjs';
import {
  distinctUntilChanged,
  exhaustMap,
  filter,
  map,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import {
  AnimationsService,
  AuthActionTypes,
  selectIsAuthenticated,
  TitleService
} from '@app/core';

import {
  ActionSettingsLoadAll,
  SettingsActions,
  SettingsActionTypes
} from './settings.actions';
import { selectSettingsState, selectTheme } from './settings.selectors';
import { SettingsState, State } from '@app/settings';
import { SettingsDataService } from '@app/settings/services/settings-data.service';

const INIT = of('zklk-init-effect-trigger');

@Injectable()
export class SettingsEffects {
  @Effect()
  loadSettings = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    exhaustMap(() =>
      this.settingsDataService
        .getAllSettings()
        .pipe(
          map((settings: SettingsState) => new ActionSettingsLoadAll(settings))
        )
    )
  );

  @Effect({ dispatch: false })
  persistSettings = this.actions$.pipe(
    ofType(
      SettingsActionTypes.CHANGE_ANIMATIONS_ELEMENTS,
      SettingsActionTypes.CHANGE_ANIMATIONS_PAGE,
      SettingsActionTypes.CHANGE_LANGUAGE,
      SettingsActionTypes.CHANGE_STICKY_HEADER,
      SettingsActionTypes.CHANGE_THEME
    ),
    withLatestFrom(
      this.store.pipe(select(selectSettingsState)),
      this.store.pipe(select(selectIsAuthenticated))
    ),
    filter(([action, settings, isAuthenticated]) => isAuthenticated),
    exhaustMap(([action, settings, isAuthenticated]) =>
      this.settingsDataService.updateAllSettings(settings)
    )
  );

  @Effect({ dispatch: false })
  updateRouteAnimationType = merge(
    INIT,
    this.actions$.pipe(
      ofType(
        SettingsActionTypes.CHANGE_ANIMATIONS_ELEMENTS,
        SettingsActionTypes.CHANGE_ANIMATIONS_PAGE
      )
    )
  ).pipe(
    withLatestFrom(this.store.pipe(select(selectSettingsState))),
    tap(([action, settings]) =>
      this.animationsService.updateRouteAnimationType(
        settings.pageAnimations,
        settings.elementsAnimations
      )
    )
  );

  @Effect({ dispatch: false })
  updateTheme = merge(
    INIT,
    this.actions$.pipe(ofType(SettingsActionTypes.CHANGE_THEME))
  ).pipe(
    withLatestFrom(this.store.pipe(select(selectTheme))),
    tap(([action, theme]) => {
      const classList = this.overlayContainer.getContainerElement().classList;
      const toRemove = Array.from(classList).filter((item: string) =>
        item.includes('-theme')
      );
      if (toRemove.length) {
        classList.remove(...toRemove);
      }
      classList.add(theme);
    })
  );

  @Effect({ dispatch: false })
  setTranslateServiceLanguage = this.store.pipe(
    select(selectSettingsState),
    map(settings => settings.language),
    distinctUntilChanged(),
    tap(language => this.translateService.use(language))
  );

  @Effect({ dispatch: false })
  setTitle = merge(
    this.actions$.pipe(ofType(SettingsActionTypes.CHANGE_LANGUAGE)),
    this.router.events.pipe(filter(event => event instanceof ActivationEnd))
  ).pipe(
    tap(() => {
      this.titleService.setTitle(
        this.router.routerState.snapshot.root,
        this.translateService
      );
    })
  );

  constructor(
    private actions$: Actions<SettingsActions>,
    private store: Store<State>,
    private router: Router,
    private overlayContainer: OverlayContainer,
    private settingsDataService: SettingsDataService,
    private titleService: TitleService,
    private animationsService: AnimationsService,
    private translateService: TranslateService
  ) {}
}
