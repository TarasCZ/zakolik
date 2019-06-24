import { debug } from '@app/core/meta-reducers/debug.reducer';
import { ActionReducer } from '@ngrx/store';
import { AppState } from '@app/core';

describe('DebugReducer', () => {
  const expectedState = { newState: 'newState' } as unknown;
  const reducer = jest.fn(() => expectedState);

  let debugReducer: any;
  let action: any;
  let newState: any;
  let state: any;

  beforeEach(() => {
    spyOn(console, 'log');
    debugReducer = debug(reducer as ActionReducer<AppState>);
    action = { type: 'action type', param: 'parameter' };
    state = { state: 'state' };
    newState = debugReducer(state, action);
  });

  it('should reduce state with provided reducer', () => {
    expect(newState).toEqual(expectedState);
  });

  it('should log action to console', () => {
    const { param } = action;
    expect(console.log).toHaveBeenCalledWith(`[DEBUG] action: ${action.type}`, {
      payload: { param },
      oldState: state,
      newState
    });
  });
});
