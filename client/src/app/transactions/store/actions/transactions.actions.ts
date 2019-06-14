import { Action } from '@ngrx/store';
import {Transaction} from '@app/transactions/model/transaction.model';

export enum TransactionActionTypes {
  UPSERT_ONE = '[Transactions] Upsert One',
  DELETE_ONE = '[Transactions] Delete One',
  UPSERT_MANY = '[Transactions] Upsert Many',
  LOAD_ALL = '[Transactions] Load All',
}

export class ActionUpsertOneTransaction implements Action {
  readonly type = TransactionActionTypes.UPSERT_ONE;
  constructor(readonly transaction: Transaction) {}
}

export class ActionDeleteOneTransaction implements Action {
  readonly type = TransactionActionTypes.DELETE_ONE;
  constructor(readonly id: string) {}
}

export class ActionUpsertManyTransactions implements Action {
  readonly type = TransactionActionTypes.UPSERT_MANY;
  constructor(readonly transactions: Array<Transaction>) {}
}

export class ActionLoadAllTransactions implements Action {
  readonly type = TransactionActionTypes.LOAD_ALL;
}

export type TransactionActions =
  ActionUpsertOneTransaction |
  ActionDeleteOneTransaction |
  ActionUpsertManyTransactions |
  ActionLoadAllTransactions;