import {
  initialState,
  transactionReducer
} from '@app/transactions/store/reducers/transactions.reducer';
import { TransactionState } from '@app/transactions/model/transaction.model';
import * as TransactionActions from '../actions/transactions.actions';

describe('TransactionReducer', () => {
  const TEST_INITIAL_STATE: TransactionState = {
    ids: ['123'],
    entities: {
      '123': {
        id: '123',
        name: 'Vyplata',
        value: 12000,
        type: 'OTHER',
        description: 'Vyplata od meho zamestnavatele',
        date: Date.now()
      }
    }
  };

  it('should return the default state', () => {
    const action = {} as any;
    const state = transactionReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should add a transaction', () => {
    const action = TransactionActions.upsertTransaction({
      transaction: {
        id: '1234',
        name: 'test',
        value: 123,
        type: 'OTHER',
        description: 'test',
        date: 123
      }
    });
    const state = transactionReducer(TEST_INITIAL_STATE, action);

    expect(state.ids.length).toEqual(2);
    expect(state.entities['1234'].name).toEqual('test');
  });

  it('should update a transaction', () => {
    const id = TEST_INITIAL_STATE.ids[0] as string;
    const action = TransactionActions.upsertTransaction({
      transaction: {
        id: id,
        value: 12000,
        name: 'updated',
        type: 'updated',
        description: 'updated',
        date: 123
      }
    });

    const state = transactionReducer(TEST_INITIAL_STATE, action);
    expect(state.entities[id]).toEqual(
      jasmine.objectContaining({
        name: 'updated',
        type: 'updated',
        description: 'updated'
      })
    );
  });

  it('should remove a transaction', () => {
    const id = TEST_INITIAL_STATE.ids[0] as string;
    const action = TransactionActions.deleteTransaction({ id });
    const state = transactionReducer(TEST_INITIAL_STATE, action);
    expect(state.entities[id]).toBe(undefined);
  });
});
