import { AppState } from '@app/core';

export type Language = 'en' | 'sk' | 'cz';

export interface SettingsState {
  language: string;
  theme: string;
  stickyHeader: boolean;
  pageAnimations: boolean;
  pageAnimationsDisabled: boolean;
  elementsAnimations: boolean;
}

export interface State extends AppState {
  settings: SettingsState;
}
