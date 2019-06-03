import { ActionReducerMap } from '@ngrx/store';

import {TransactionState} from '@app/transactions/store/transaction.model';
import {transactionReducer} from '@app/transactions/store/transactions.reducer';

export const FEATURE_NAME = 'transaction';

export const reducers: ActionReducerMap<StoreState> = {
  transactions: transactionReducer,
};

export interface StoreState {
  transactions: TransactionState;
}
