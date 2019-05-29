import { EntityState } from '@ngrx/entity';

export interface Transaction {
  id: string;
  name: string;
  value: number;
  type: string;
  description: string;
  date: number;
  isSelected: boolean;
}

export interface TransactionState extends EntityState<Transaction> {}
