import {createFeatureSelector} from '@ngrx/store';

import {transactionAdapter} from './transactions.reducer';
import {TransactionState} from '@app/transactions/store/transaction.model';

export const selectTransactionState = createFeatureSelector<TransactionState>('transaction');

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = transactionAdapter.getSelectors(selectTransactionState);
