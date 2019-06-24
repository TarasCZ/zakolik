import * as UiActions from './ui.actions';
import { UiState } from '@app/core/ui/ui.state';
import { initialState, uiReducer } from '@app/core/ui/ui.reducer';

describe('UiReducer', () => {
  const TEST_INITIAL_STATE: UiState = {
    isLoading: true
  };

  it('should return default state', () => {
    const action = {} as any;
    const state = uiReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should set isLoading to true on showSpinner', () => {
    const action = UiActions.showSpinner();
    const state = uiReducer(TEST_INITIAL_STATE, action);

    expect(state.isLoading).toBe(true);
  });

  it('should set isLoading to false on hideSpinner', () => {
    const action = UiActions.hideSpinner();
    const state = uiReducer(TEST_INITIAL_STATE, action);

    expect(state.isLoading).toBe(false);
  });
});
