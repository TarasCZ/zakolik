import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';

import {Transaction, TransactionState} from './transaction.model';
import {TransactionActionTypes, TransactionActions} from './transactions.actions';

export const transactionAdapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>();

export const initialState: TransactionState = transactionAdapter.getInitialState({
  ids: ['123'],
  entities: {
    '123': {
      id: '123',
      name: 'Vyplata',
      value: 12000,
      type: 'OTHER',
      description: 'Vyplata od meho zamestnavatele',
      date: Date.now(),
    }
  }
});

export function transactionReducer(
  state: TransactionState = initialState,
  action: TransactionActions
): TransactionState {
  switch (action.type) {
    case TransactionActionTypes.UPSERT_ONE:
      return transactionAdapter.upsertOne(action.payload.transaction, state);

    case TransactionActionTypes.DELETE_ONE:
      return transactionAdapter.removeOne(action.payload.id, state);

    default:
      return state;
  }
}
