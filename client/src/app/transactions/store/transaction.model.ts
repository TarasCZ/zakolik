import { EntityState } from '@ngrx/entity';

export enum TransactionTypes {
  Other = 'OTHER',
  Living = 'LIVING',
  Phone = 'PHONE',
  Transport = 'TRANSPORT',
  Food = 'FOOD',
  Shopping = 'SHOPPING',
  Insurance = 'INSURANCE',
  Services = 'SERVICES',
  Payment = 'PAYMENT',
  Entertainment = 'ENTERTAINMENT'
}

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
