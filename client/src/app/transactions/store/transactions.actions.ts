import { Action } from '@ngrx/store';
import {Transaction} from '@app/transactions/store/transaction.model';

export enum TransactionActionTypes {
  UPSERT_ONE = '[Transactions] Upsert One',
  DELETE_ONE = '[Transactions] Delete One'
}

export class ActionUpsertOneTransaction implements Action {
  readonly type = TransactionActionTypes.UPSERT_ONE;
  constructor(readonly payload: { transaction: Transaction }) {}
}

export class ActionDeleteOneTransaction implements Action {
  readonly type = TransactionActionTypes.DELETE_ONE;
  constructor(readonly payload: { id: string }) {}
}

export type TransactionActions = ActionUpsertOneTransaction | ActionDeleteOneTransaction;
