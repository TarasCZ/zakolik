import { Action } from '@ngrx/store';
import {Transaction} from '@app/transactions/store/transaction.model';

export enum TransactionActionTypes {
  UPSERT_ONE = '[Transactions] Upsert One',
  DELETE_ONE = '[Transactions] Delete One',
  SELECT_ONE = '[Transactions] Select One'
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

export type TransactionActions = ActionUpsertOneTransaction | ActionDeleteOneTransaction | ActionSelectOneTransaction;
