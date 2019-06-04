import { Action } from '@ngrx/store';
import {Transaction} from '@app/transactions/store/transaction.model';

export enum TransactionActionTypes {
  UPSERT_ONE = '[Transactions] Upsert One',
  DELETE_ONE = '[Transactions] Delete One',
  SELECT_ONE = '[Transactions] Select One',
  UPSERT_MANY = '[Transactions] Upsert Many',
  LOAD_ALL = '[Transactions] Load All'
  // LOADED_ALL = '[Transactions] Loaded All'
}

export class ActionUpsertOneTransaction implements Action {
  readonly type = TransactionActionTypes.UPSERT_ONE;
  constructor(readonly transaction: Transaction) {}
}

export class ActionDeleteOneTransaction implements Action {
  readonly type = TransactionActionTypes.DELETE_ONE;
  constructor(readonly id: string) {}
}

export class ActionSelectOneTransaction implements Action {
  readonly type = TransactionActionTypes.SELECT_ONE;
  constructor(readonly id: string, readonly isSelected: boolean) {}
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
  ActionSelectOneTransaction |
  ActionUpsertManyTransactions |
  ActionLoadAllTransactions;
