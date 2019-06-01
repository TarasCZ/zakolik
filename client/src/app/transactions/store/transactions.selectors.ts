import {createFeatureSelector, createSelector} from '@ngrx/store';

import {transactionAdapter} from './transactions.reducer';
import {TransactionState} from '@app/transactions/store/transaction.model';

export const selectTransactionState = createFeatureSelector<TransactionState>('transaction');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = transactionAdapter.getSelectors(selectTransactionState);

export const selectTransaction = (id: string) => createSelector(
  selectEntities,
  entities => entities[id]
);