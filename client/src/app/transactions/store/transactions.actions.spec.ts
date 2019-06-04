import {
  ActionUpsertOneTransaction, ActionDeleteOneTransaction,
  TransactionActionTypes,
} from './transactions.actions';

describe('Books Actions', () => {
  it('should upsert ActionUpsertOneTransaction action', () => {
    const action = new ActionUpsertOneTransaction({
      id: '1',
      name: 'test',
      value: 12000,
      description: '',
      type: 'OTHER',
      date: 123,
      isSelected: false
    });
    expect(action.type).toEqual(TransactionActionTypes.UPSERT_ONE);
    expect(action.transaction).toEqual(
      jasmine.objectContaining({
        id: '1',
        name: 'test',
        value: 12000,
        description: '',
        type: 'OTHER',
        date: 123
      })
    );
  });

  it('should upsert ActionDeleteOneTransaction action', () => {
    const action = new ActionDeleteOneTransaction('1' );
    expect(action.type).toEqual(TransactionActionTypes.DELETE_ONE);
    expect(action.id).toEqual('1');
  });
});
