import {Connection} from 'mongoose';
import {TransactionSchema} from './transaction.schema';

export const transactionProviders = [
    {
        provide: 'TRANSACTION_MODEL',
        useFactory: (connection: Connection) => connection.model('Transaction', TransactionSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
