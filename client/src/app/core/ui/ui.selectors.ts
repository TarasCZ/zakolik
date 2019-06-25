import { createSelector } from '@ngrx/store';
import { selectUiState } from '@app/core/ui/ui.reducer';

export const selectIsLoading = createSelector(
  selectUiState,
  uiState => uiState.isLoading
);
