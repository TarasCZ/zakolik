import {Module} from '@nestjs/common';
import {TransactionController} from './transaction.controller';
import {TransactionService} from './transaction.service';
import {AuthModule} from '../auth/auth.module';
import {TransactionEntity} from './transaction.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([TransactionEntity]),
        AuthModule,
    ],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}
