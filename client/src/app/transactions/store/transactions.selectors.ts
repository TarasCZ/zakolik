import { createFeatureSelector, createSelector } from '@ngrx/store';

import { transactionAdapter } from './reducers/transactions.reducer';
import { TransactionState } from '@app/transactions/model/transaction.model';

export const selectTransactionState = createFeatureSelector<TransactionState>(
  'transaction'
);

export const { selectEntities, selectAll } = transactionAdapter.getSelectors(
  selectTransactionState
);

export const selectTransaction = createSelector(
  selectEntities,
  (entities, id) => entities[id]
);
