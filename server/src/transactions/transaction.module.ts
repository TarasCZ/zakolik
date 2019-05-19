import {DatabaseModule} from '../database/database.module';
import {Module} from '@nestjs/common';
import {TransactionController} from './transaction.controller';
import {TransactionService} from './transaction.service';
import {transactionProviders} from './transaction.provider';
import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [TransactionController],
    providers: [TransactionService, ...transactionProviders],
})

export class TransactionModule {}
