import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as TransactionActions from '../actions/transactions.actions';
import { Transaction, TransactionState } from '../../model/transaction.model';
import { createReducer, on } from '@ngrx/store';

export const transactionAdapter: EntityAdapter<
  Transaction
> = createEntityAdapter<Transaction>({
  sortComparer: (a, b) => b.date - a.date
});

export const initialState: TransactionState = transactionAdapter.getInitialState(
  {
    ids: [],
    entities: {}
  }
);

export const transactionReducer = createReducer(
  initialState,
  on(TransactionActions.upsertTransaction, (state, action) =>
    transactionAdapter.upsertOne(action.transaction, state)
  ),
  on(TransactionActions.deleteTransaction, (state, action) =>
    transactionAdapter.removeOne(action.id, state)
  ),
  on(TransactionActions.upsertManyTransactions, (state, action) =>
    transactionAdapter.upsertMany(action.transactions, state)
  )
);
