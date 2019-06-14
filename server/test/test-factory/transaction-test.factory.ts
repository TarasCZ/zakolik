import {TransactionEntity} from '../../src/transactions/transaction.entity';
import {Transaction} from '../../src/transactions/transaction.model';

export class TransactionTestFactory {
    static createTransaction(partialTransaction?: Partial<TransactionEntity>): Transaction {
        return {
            id: '123',
            name: 'name',
            value: 123,
            type: 'other',
            description: 'description',
            date: 1234567890,
            ...partialTransaction,
        };
    }
}