import {
  Transaction,
  TransactionTypes
} from '@app/transactions/model/transaction.model';

export const createTransaction = ({
  id = 'id',
  name = 'name',
  value = 123,
  description = 'description',
  type = TransactionTypes.Other,
  date = 0
}: Partial<Transaction>) => ({
  id,
  name,
  value,
  description,
  type,
  date
});
