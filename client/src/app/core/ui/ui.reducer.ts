import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as uiActions from './ui.actions';
import { UiState } from '@app/core/ui/ui.state';
import { AppState } from '@app/core';

export const selectUiState = createFeatureSelector<AppState, UiState>('ui');

export const initialState: UiState = {
  isLoading: true
};

export const uiReducer = createReducer(
  initialState,
  on(uiActions.showSpinner, () => ({ isLoading: true })),
  on(uiActions.hideSpinner, () => ({ isLoading: false }))
);
