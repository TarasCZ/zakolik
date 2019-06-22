import { createReducer, on } from '@ngrx/store';
import * as uiActions from './ui.actions';
import { UiState } from '@app/core/ui/ui.state';

const initialState: UiState = {
  isLoading: false
};

export const uiReducer = createReducer(
  initialState,
  on(uiActions.showSpinner, () => ({ isLoading: true })),
  on(uiActions.hideSpinner, () => ({ isLoading: false }))
);