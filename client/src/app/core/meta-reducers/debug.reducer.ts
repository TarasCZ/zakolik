import { ActionReducer } from '@ngrx/store';

import { AppState } from '../core.state';

export function debug(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function(state, action) {
    const newState = reducer(state, action);
    const { type, ...payload } = action;
    console.log(`[DEBUG] action: ${action.type}`, {
      payload,
      oldState: state,
      newState
    });
    return newState;
  };
}
