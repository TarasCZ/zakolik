import {
  changeAnimationsElements,
  changeAnimationsPage,
  changeAnimationsPageDisabled,
  changeLanguage,
  changeStickyHeader,
  changeTheme
} from './settings.actions';

describe('Settings Actions', () => {
  it('should upsert changeTheme action', () => {
    const action = changeTheme({
      theme: 'DARK_THEME'
    });

    expect(action.theme).toEqual('DARK_THEME');
  });

  it('should upsert changeAnimationsElements action', () => {
    const action = changeAnimationsElements({
      elementsAnimations: true
    });

    expect(action.elementsAnimations).toEqual(true);
  });

  it('should upsert changeAnimationsPage action', () => {
    const action = changeAnimationsPage({
      pageAnimations: true
    });

    expect(action.pageAnimations).toEqual(true);
  });

  it('should upsert changeAnimationsPageDisabled action', () => {
    const action = changeAnimationsPageDisabled({
      pageAnimationsDisabled: true
    });

    expect(action.pageAnimationsDisabled).toEqual(true);
  });

  it('should upsert changeLanguage action', () => {
    const action = changeLanguage({
      language: 'en'
    });

    expect(action.language).toEqual('en');
  });

  it('should upsert changeStickyHeader action', () => {
    const action = changeStickyHeader({
      stickyHeader: true
    });

    expect(action.stickyHeader).toEqual(true);
  });
});
