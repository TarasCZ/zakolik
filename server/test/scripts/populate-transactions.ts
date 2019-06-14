import {createConnection} from 'typeorm';
import {TransactionEntity} from '../../src/transactions/transaction.entity';
import {transactions} from './random-transactions';

(async () => {
    try {
        const connection = await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5433,
            username: 'zakolik',
            password: 'development',
            database: 'zakolik',
            entities: [`${__dirname}/../../src/**/*.entity{.ts,.js}`],
        });

        const transactionRepository = connection.getRepository(TransactionEntity);
        await transactionRepository.clear();
        await transactionRepository.save(transactions);
        await connection.close();
        console.log('Database sucessfully populated');
    } catch (err) {
        console.error(err.name, err.message);
    }
})();
