import { SettingsState } from './settings.model';
import { SettingsActions, SettingsActionTypes } from './settings.actions';

export const initialState: SettingsState = {
  language: 'en',
  theme: 'LIGHT-THEME',
  stickyHeader: true,
  pageAnimations: true,
  pageAnimationsDisabled: false,
  elementsAnimations: true,
  picture: ''
};

export function settingsReducer(
  state: SettingsState = initialState,
  action: SettingsActions
): SettingsState {
  switch (action.type) {
    case SettingsActionTypes.CHANGE_LANGUAGE:
    case SettingsActionTypes.CHANGE_THEME:
    case SettingsActionTypes.CHANGE_STICKY_HEADER:
    case SettingsActionTypes.CHANGE_ANIMATIONS_PAGE:
    case SettingsActionTypes.CHANGE_ANIMATIONS_ELEMENTS:
    case SettingsActionTypes.LOAD_ALL_SETTINGS:
      return { ...state, ...action.payload };

    case SettingsActionTypes.CHANGE_ANIMATIONS_PAGE_DISABLED:
      return {
        ...state,
        pageAnimations: false,
        pageAnimationsDisabled: action.payload.pageAnimationsDisabled
      };

    default:
      return state;
  }
}
