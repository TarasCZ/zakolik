import { ActionReducerMap } from '@ngrx/store';

import { TransactionState } from '@app/transactions/model/transaction.model';
import { transactionReducer } from '@app/transactions/store/reducers/transactions.reducer';

export const reducers: ActionReducerMap<StoreState> = {
  transactions: transactionReducer
};

export interface StoreState {
  transactions: TransactionState;
}
