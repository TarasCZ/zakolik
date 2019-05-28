import { Action } from '@ngrx/store';
import { Book } from './transaction.model';

export enum BookActionTypes {
  ADD_TRANSACTION = '[Books] Upsert One',
  DELETE_TRANSACTION = '[Books] Delete One'
}

export class AddTransaction implements Action {
  readonly type = BookActionTypes.UPSERT_ONE;
  constructor(readonly payload: { book: Book }) {}
}

export class DeleteTransaction implements Action {
  readonly type = BookActionTypes.DELETE_ONE;
  constructor(readonly payload: { id: string }) {}
}

export type BookActions = ActionBooksUpsertOne | ActionBooksDeleteOne;
