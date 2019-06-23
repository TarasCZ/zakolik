import * as TransactionActions from './transactions.actions';

describe('Transaction Actions', () => {
  it('should upsert ActionUpsertOneTransaction action', () => {
    const transaction = {
      id: '1',
      name: 'test',
      value: 12000,
      description: '',
      type: 'OTHER',
      date: 123
    };
    const action = TransactionActions.upsertTransaction({ transaction });
    expect(action.transaction).toEqual(transaction);
  });

  it('should upsert ActionDeleteOneTransaction action', () => {
    const action = TransactionActions.deleteTransaction({ id: '1' });
    expect(action.id).toEqual('1');
  });
});
