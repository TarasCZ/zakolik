import { createSelector } from '@ngrx/store';
import { selectUiState } from '@app/core';

export const selectIsLoading = createSelector(
  selectUiState,
  uiState => uiState.isLoading
);
