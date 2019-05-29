import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';

import {Transaction, TransactionState} from './transaction.model';
import {TransactionActions, TransactionActionTypes} from './transactions.actions';
import * as fromTransactions from './transactions.selectors';

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
      isSelected: false,
    }
  }
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

    case TransactionActionTypes.SELECT_ONE:
      return transactionAdapter.updateOne({id: action.id, changes: {isSelected: action.isSelected}}, state);

    default:
      return state;
  }
}
