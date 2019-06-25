import { Action, ActionReducer, ActionReducerMap } from '@ngrx/store';

import { TransactionState } from '@app/transactions/model/transaction.model';
import { transactionReducer } from '@app/transactions/store/reducers/transactions.reducer';
import { InjectionToken } from '@angular/core';
import { settingsReducer, SettingsState } from '@app/settings';
import { AppState } from '@app/core';

export const TRANSACTIONS_REDUCER = new InjectionToken<
  ActionReducer<TransactionState, Action>
>('Transactions reducers token', {
  factory: () => transactionReducer
});

export interface StoreState {
  transactions: TransactionState;
}
