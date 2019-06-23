import { ActivationEnd, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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
  LocalStorageService,
  loginSuccess,
  selectIsAuthenticated,
  TitleService,
  UpdateRouteAnimationTypeProps
} from '@app/core';

import * as SettingsActions from './settings.actions';
import { selectSettingsState, selectTheme } from './settings.selectors';
import { SettingsState, State } from '@app/settings';
import { SettingsDataService } from '@app/settings/services/settings-data.service';
import { hideSpinner } from '@app/core/ui/ui.actions';

export const SETTINGS_KEY = 'SETTINGS';

const INIT = of({ type: 'zklk-init-effect-trigger' });

@Injectable()
export class SettingsEffects {
  loadSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      exhaustMap(() =>
        this.settingsDataService.getAllSettings().pipe(
          tap((settings: SettingsState) =>
            this.localStorageService.setItem(SETTINGS_KEY, settings)
          ),
          map((settings: SettingsState) => SettingsActions.loadAll(settings))
        )
      )
    )
  );

  settingsLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.loadAll),
      map(() => hideSpinner())
    )
  );

  persistSettings$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          SettingsActions.changeAnimationsElements,
          SettingsActions.changeAnimationsPage,
          SettingsActions.changeLanguage,
          SettingsActions.changeStickyHeader,
          SettingsActions.changeTheme
        ),
        withLatestFrom(
          this.store.pipe(select(selectSettingsState)),
          this.store.pipe(select(selectIsAuthenticated))
        ),
        map(([{ type, ...payload }, settings, isAuthenticated]) => {
          return [{ ...settings, ...payload }, isAuthenticated];
        }),
        tap(([newSettings]) => {
          this.localStorageService.setItem(SETTINGS_KEY, newSettings);
        }),
        exhaustMap(
          ([newSettings, isAuthenticated]: [SettingsState, boolean]) => {
            if (isAuthenticated) {
              return this.settingsDataService.updateAllSettings(newSettings);
            } else {
              return of({});
            }
          }
        )
      ),
    { dispatch: false }
  );

  updateRouteAnimationType$ = createEffect(
    () =>
      merge(
        INIT,
        this.actions$.pipe(
          ofType(
            SettingsActions.changeAnimationsElements,
            SettingsActions.changeAnimationsPage
          )
        )
      ).pipe(
        withLatestFrom(this.store.pipe(select(selectSettingsState))),
        tap(
          ([{ type, ...payload }, { pageAnimations, elementsAnimations }]) => {
            const routeAnimationProps: UpdateRouteAnimationTypeProps = {
              pageAnimations,
              elementsAnimations,
              ...payload
            };

            this.animationsService.updateRouteAnimationType(
              routeAnimationProps
            );
          }
        )
      ),
    { dispatch: false }
  );

  updateTheme$ = createEffect(
    () =>
      merge(INIT, this.actions$.pipe(ofType(SettingsActions.changeTheme))).pipe(
        withLatestFrom(this.store.pipe(select(selectTheme))),
        tap(([{ type, ...payload }, stateTheme]) => {
          const { theme } = { theme: stateTheme, ...payload };
          const classList = this.overlayContainer.getContainerElement()
            .classList;
          const toRemove = Array.from(classList).filter((item: string) =>
            item.includes('-theme')
          );
          if (toRemove.length) {
            classList.remove(...toRemove);
          }
          classList.add(theme.toLowerCase());
        })
      ),
    { dispatch: false }
  );

  setTranslateServiceLanguage$ = createEffect(
    () =>
      this.store.pipe(
        select(selectSettingsState),
        map(settings => settings.language),
        distinctUntilChanged(),
        tap(language => this.translateService.use(language))
      ),
    { dispatch: false }
  );

  setTitle$ = createEffect(
    () =>
      merge(
        this.actions$.pipe(ofType(SettingsActions.changeLanguage)),
        this.router.events.pipe(filter(event => event instanceof ActivationEnd))
      ).pipe(
        tap(() => {
          this.titleService.setTitle(
            this.router.routerState.snapshot.root,
            this.translateService
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private router: Router,
    private overlayContainer: OverlayContainer,
    private settingsDataService: SettingsDataService,
    private titleService: TitleService,
    private animationsService: AnimationsService,
    private translateService: TranslateService,
    private localStorageService: LocalStorageService
  ) {}
}
