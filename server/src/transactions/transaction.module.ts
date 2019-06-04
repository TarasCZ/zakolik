import {Module} from '@nestjs/common';
import {TransactionController} from './transaction.controller';
import {TransactionService} from './transaction.service';
import {AuthModule} from '../auth/auth.module';
import {MongooseModule} from '@nestjs/mongoose';
import {TransactionSchema} from './transaction.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }]),
        AuthModule,
    ],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}
