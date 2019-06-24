import { debug } from '@app/core/meta-reducers/debug.reducer';
import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { AppState, LocalStorageService } from '@app/core';
import { initStateFromLocalStorage } from '@app/core/meta-reducers/init-state-from-local-storage.reducer';

describe('InitStateFromLocalStorage', () => {
  const expectedState = {
    expectedState: 'expectedState',
    overwritten: 'is'
  } as unknown;
  const state = { state: 'state', overwritten: 'not' } as unknown;
  const reducer = jest.fn(() => state);

  let initStateFromLSReducer: any;
  let newState: any;

  beforeEach(() => {
    spyOn(LocalStorageService, 'loadInitialState').and.returnValue(
      expectedState
    );
    initStateFromLSReducer = initStateFromLocalStorage(reducer as ActionReducer<
      AppState
    >);
  });

  it('should load LS initial state when INIT, UPDATE actions are dispatched', () => {
    [INIT.toString(), UPDATE.toString()].forEach(type => {
      const action = { type };
      newState = initStateFromLSReducer(state, action);

      expect(newState).toEqual({ ...state, ...expectedState });
    });
  });
});
