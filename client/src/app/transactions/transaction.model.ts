import { EntityState } from '@ngrx/entity';

export interface Transaction {
  id: string;
  title: string;
  author: string;
  description: string;
}

export interface TransactionState extends EntityState<Transaction> {}
