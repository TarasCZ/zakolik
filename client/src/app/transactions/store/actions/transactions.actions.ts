import { createAction, props } from '@ngrx/store';
import { Transaction } from '@app/transactions/model/transaction.model';

export const upsertTransaction = createAction(
  '[Transactions] Upsert One',
  props<{ transaction: Transaction }>()
);

export const deleteTransaction = createAction(
  '[Transactions] Delete One',
  props<{ id: string }>()
);

export const upsertManyTransactions = createAction(
  '[Transactions] Upsert Many',
  props<{ transactions: Array<Transaction> }>()
);

export const loadAllTransactions = createAction('[Transactions] Load All');
