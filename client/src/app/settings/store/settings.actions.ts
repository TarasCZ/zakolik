import { createAction, props } from '@ngrx/store';

import { Language, SettingsState } from './settings.model';

export const changeLanguage = createAction(
  '[Settings] Change Language',
  props<{ language: Language }>()
);

export const changeTheme = createAction(
  '[Settings] Change Theme',
  props<{ theme: string }>()
);

export const changeStickyHeader = createAction(
  '[Settings] Change Sticky Header',
  props<{ stickyHeader: boolean }>()
);

export const changeAnimationsPage = createAction(
  '[Settings] Change Animations Page',
  props<{ pageAnimations: boolean }>()
);

export const changeAnimationsPageDisabled = createAction(
  '[Settings] Change Animations Page Disabled',
  props<{ pageAnimationsDisabled: boolean }>()
);

export const changeAnimationsElements = createAction(
  '[Settings] Change Animations Elements',
  props<{ elementsAnimations: boolean }>()
);

export const loadAll = createAction(
  '[Settings] Load All',
  props<SettingsState>()
);

export const saveAll = createAction('[Settings] Save All');
