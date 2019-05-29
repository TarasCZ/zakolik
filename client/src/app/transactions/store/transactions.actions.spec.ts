import {
  ActionUpsertOneTransaction, ActionDeleteOneTransaction,
  TransactionActionTypes,
} from './transactions.actions';

describe('Books Actions', () => {
  it('should create ActionUpsertOneTransaction action', () => {
    const action = new ActionUpsertOneTransaction({
      transaction: {
        id: '1',
        name: 'test',
        value: 12000,
        description: '',
        type: 'OTHER',
        date: 123
      }
    });
    expect(action.type).toEqual(TransactionActionTypes.UPSERT_ONE);
    expect(action.payload.transaction).toEqual(
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

  it('should create ActionDeleteOneTransaction action', () => {
    const action = new ActionDeleteOneTransaction({ id: '1' });
    expect(action.type).toEqual(TransactionActionTypes.DELETE_ONE);
    expect(action.payload.id).toEqual('1');
  });
});
