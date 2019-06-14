import { EntityState } from '@ngrx/entity';

export enum TransactionTypes {
  Other =         'OTHER',
  Living =        'LIVING',
  Phone =         'PHONE',
  Transport =     'TRANSPORT',
  Food =          'FOOD',
  Shopping =      'SHOPPING',
  Insurance =     'INSURANCE',
  Services =      'SERVICES',
  Payment =       'PAYMENT',
  Entertainment = 'ENTERTAINMENT'
}

export const TransactionTypeIcons = {
  [TransactionTypes.Other]:         {icon: 'wallet'},
  [TransactionTypes.Living]:        {icon: 'home'},
  [TransactionTypes.Phone]:         {icon: 'phone'},
  [TransactionTypes.Transport]:     {icon: 'car'},
  [TransactionTypes.Food]:          {icon: 'utensils'},
  [TransactionTypes.Shopping]:      {icon: 'shopping-cart'},
  [TransactionTypes.Insurance]:     {icon: 'house-damage'},
  [TransactionTypes.Services]:      {icon: 'concierge-bell'},
  [TransactionTypes.Payment]:       {icon: 'money-bill-wave'},
  [TransactionTypes.Entertainment]: {icon: 'laugh-beam'},
};

export interface Transaction {
  id: string;
  name: string;
  value: number;
  type: string;
  description: string;
  date: number;
}

export interface TransactionState extends EntityState<Transaction> {}
