import * as TransactionActions from './transactions.actions';

describe('Transaction Actions', () => {
  const transaction = {
    id: '1',
    name: 'test',
    value: 12000,
    description: '',
    type: 'OTHER',
    date: 123
  };

  it('should create upsertTransaction action', () => {
    const action = TransactionActions.upsertTransaction({ transaction });
    expect(action.transaction).toEqual(transaction);
  });

  it('should create deleteTransaction action', () => {
    const action = TransactionActions.deleteTransaction({ id: '1' });
    expect(action.id).toEqual('1');
  });

  it('should create upsertManyTransactions action', () => {
    const transactions = [transaction];
    const action = TransactionActions.upsertManyTransactions({ transactions });
    expect(action.transactions).toEqual(transactions);
  });
});
