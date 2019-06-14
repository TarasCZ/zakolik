import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SettingsState, State } from './settings.model';

export const selectSettingsState = createFeatureSelector<State, SettingsState>(
  'settings'
);

export const selectSettings = createSelector(
  selectSettingsState,
  (state: SettingsState) => state
);

export const selectSettingsStickyHeader = createSelector(
  selectSettings,
  (state: SettingsState) => state.stickyHeader
);

export const selectSettingsLanguage = createSelector(
  selectSettings,
  (state: SettingsState) => state.language
);

export const selectTheme = createSelector(
  selectSettings,
  settings => settings.theme.toLowerCase()
);

export const selectPicture = createSelector(
  selectSettings,
  settings => settings.picture
);
