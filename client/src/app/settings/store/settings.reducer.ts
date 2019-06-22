import { SettingsState } from './settings.model';
import * as SettingsActions from './settings.actions';

import { createReducer, on } from '@ngrx/store';

export const initialState: SettingsState = {
  language: 'en',
  theme: 'LIGHT-THEME',
  stickyHeader: true,
  pageAnimations: true,
  pageAnimationsDisabled: false,
  elementsAnimations: true,
  picture: ''
};

export const settingsReducer = createReducer(
  initialState,
  on(
    SettingsActions.changeLanguage,
    SettingsActions.changeTheme,
    SettingsActions.changeStickyHeader,
    SettingsActions.changeAnimationsPage,
    SettingsActions.changeAnimationsElements,
    SettingsActions.loadAll,
    (state, props) => ({ ...state, ...props })
  ),
  on(
    SettingsActions.changeAnimationsPageDisabled,
    (state, { pageAnimationsDisabled }) => ({
      ...state,
      pageAnimations: false,
      pageAnimationsDisabled
    })
  )
);
