import { initialState, settingsReducer } from './settings.reducer';

import {
  changeAnimationsElements,
  changeAnimationsPage,
  changeAnimationsPageDisabled,
  changeLanguage,
  changeStickyHeader,
  changeTheme
} from './settings.actions';

describe('SettingsReducer', () => {
  it('should return default state', () => {
    const action = {} as any;
    const state = settingsReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should update language', () => {
    const action = changeLanguage({ language: 'sk' });
    const state = settingsReducer(undefined, action);
    expect(state.language).toEqual('sk');
  });

  it('should update theme', () => {
    const action = changeTheme({ theme: 'dark' });
    const state = settingsReducer(undefined, action);
    expect(state.theme).toEqual('dark');
  });

  it('should update pageAnimations', () => {
    const action = changeAnimationsPage({
      pageAnimations: false
    });
    const state = settingsReducer(undefined, action);
    expect(state.pageAnimations).toEqual(false);
  });

  it('should update pageAnimationsDisabled and pageAnimations', () => {
    const action = changeAnimationsPageDisabled({
      pageAnimationsDisabled: true
    });
    const state = settingsReducer(undefined, action);
    expect(state.pageAnimationsDisabled).toEqual(true);
    expect(state.pageAnimations).toEqual(false);
  });

  it('should update elementsAnimations', () => {
    const action = changeAnimationsElements({
      elementsAnimations: false
    });
    const state = settingsReducer(undefined, action);
    expect(state.elementsAnimations).toEqual(false);
  });

  it('should update stickyHeader', () => {
    const action = changeStickyHeader({
      stickyHeader: false
    });
    const state = settingsReducer(undefined, action);
    expect(state.stickyHeader).toEqual(false);
  });
});
