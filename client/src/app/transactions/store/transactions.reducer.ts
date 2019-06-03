import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';

import {Transaction, TransactionState} from './transaction.model';
import {TransactionActions, TransactionActionTypes} from './transactions.actions';

export const transactionAdapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>();

export const initialState: TransactionState = transactionAdapter.getInitialState({
  ids: ['123'],
  entities: {
    '123': {
      id: '123',
      name: 'Transakce Jedna',
      value: 12345,
      type: 'OTHER',
      description: 'I hope your animations will work someday',
      date: Date.now(),
      isSelected: false
    }
  }
});

// export const initialState: TransactionState = transactionAdapter.getInitialState({
//   ids: [],
//   entities: {}
// });

export function transactionReducer(
  state: TransactionState = initialState,
  action: TransactionActions
): TransactionState {
  switch (action.type) {
    case TransactionActionTypes.UPSERT_ONE:
      return transactionAdapter.upsertOne(action.transaction, state);

    case TransactionActionTypes.DELETE_ONE:
      return transactionAdapter.removeOne(action.id, state);

    case TransactionActionTypes.SELECT_ONE:
      return transactionAdapter.updateOne({ id: action.id, changes: { isSelected: action.isSelected } }, state);

    case TransactionActionTypes.UPSERT_MANY:
      return transactionAdapter.upsertMany(action.transactions, state);

    default:
      return state;
  }
}
