import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';

import {Transaction, TransactionState} from '../../model/transaction.model';
import {TransactionActions, TransactionActionTypes} from '../actions/transactions.actions';

export const transactionAdapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>({
  sortComparer: (a, b) => b.date - a.date
});

export const initialState: TransactionState = transactionAdapter.getInitialState({
  ids: [],
  entities: {}
});

export function transactionReducer(
  state: TransactionState = initialState,
  action: TransactionActions
): TransactionState {
  switch (action.type) {
    case TransactionActionTypes.UPSERT_ONE:
      return transactionAdapter.upsertOne(action.transaction, state);

    case TransactionActionTypes.DELETE_ONE:
      return transactionAdapter.removeOne(action.id, state);

    case TransactionActionTypes.UPSERT_MANY:
      return transactionAdapter.upsertMany(action.transactions, state);

    default:
      return state;
  }
}