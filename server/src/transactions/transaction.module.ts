import {DatabaseModule} from '../database/database.module';
import {Module} from '@nestjs/common';
import {TransactionController} from './transaction.controller';
import {TransactionService} from './transaction.service';
import {transactionProviders} from './transaction.provider';

@Module({
    imports: [DatabaseModule],
    controllers: [TransactionController],
    providers: [TransactionService, ...transactionProviders],
})

export class TransactionModule {}
