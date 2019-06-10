import {
  ActionSettingsChangeAnimationsElements,
  ActionSettingsChangeAnimationsPage,
  ActionSettingsChangeAnimationsPageDisabled,
  ActionSettingsChangeAutoNightMode,
  ActionSettingsChangeHour,
  ActionSettingsChangeLanguage,
  ActionSettingsChangeStickyHeader,
  ActionSettingsChangeTheme,
  SettingsActionTypes
} from './settings.actions';
import { NIGHT_MODE_THEME } from './settings.model';

describe('Settings Actions', () => {
  it('should upsert ActionSettingsChangeTheme action', () => {
    const action = new ActionSettingsChangeTheme({
      theme: NIGHT_MODE_THEME
    });

    expect(action.type).toEqual(SettingsActionTypes.CHANGE_THEME);
    expect(action.payload.theme).toEqual(NIGHT_MODE_THEME);
  });

  it('should upsert ActionSettingsChangeAnimationsElements action', () => {
    const action = new ActionSettingsChangeAnimationsElements({
      elementsAnimations: true
    });

    expect(action.type).toEqual(SettingsActionTypes.CHANGE_ANIMATIONS_ELEMENTS);
    expect(action.payload.elementsAnimations).toEqual(true);
  });

  it('should upsert ActionSettingsChangeAnimationsPage action', () => {
    const action = new ActionSettingsChangeAnimationsPage({
      pageAnimations: true
    });

    expect(action.type).toEqual(SettingsActionTypes.CHANGE_ANIMATIONS_PAGE);
    expect(action.payload.pageAnimations).toEqual(true);
  });

  it('should upsert ActionSettingsChangeAnimationsPageDisabled action', () => {
    const action = new ActionSettingsChangeAnimationsPageDisabled({
      pageAnimationsDisabled: true
    });

    expect(action.type).toEqual(
      SettingsActionTypes.CHANGE_ANIMATIONS_PAGE_DISABLED
    );
    expect(action.payload.pageAnimationsDisabled).toEqual(true);
  });

  it('should upsert ActionSettingsChangeAutoNightMode action', () => {
    const action = new ActionSettingsChangeAutoNightMode({
      autoNightMode: true
    });

    expect(action.type).toEqual(
      SettingsActionTypes.CHANGE_AUTO_NIGHT_AUTO_MODE
    );
    expect(action.payload.autoNightMode).toEqual(true);
  });

  it('should upsert ActionSettingsChangeLanguage action', () => {
    const action = new ActionSettingsChangeLanguage({
      language: 'en'
    });

    expect(action.type).toEqual(SettingsActionTypes.CHANGE_LANGUAGE);
    expect(action.payload.language).toEqual('en');
  });

  it('should upsert ActionSettingsChangeStickyHeader action', () => {
    const action = new ActionSettingsChangeStickyHeader({
      stickyHeader: true
    });

    expect(action.type).toEqual(SettingsActionTypes.CHANGE_STICKY_HEADER);
    expect(action.payload.stickyHeader).toEqual(true);
  });

  it('should upsert ActionSettingsChangeHour action', () => {
    const action = new ActionSettingsChangeHour({
      hour: 7
    });

    expect(action.type).toEqual(SettingsActionTypes.CHANGE_HOUR);
    expect(action.payload.hour).toEqual(7);
  });
});
