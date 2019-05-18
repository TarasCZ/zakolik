import {Inject, Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {Transaction} from './transaction.interface';
import {CreateTransactionDto} from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
    constructor(@Inject('TRANSACTION_MODEL') private readonly transactionModel: Model<Transaction>) {
    }

    async create(createUserDto: CreateTransactionDto): Promise<Transaction> {
        const createTransaction = new this.transactionModel(createUserDto);
        return await createTransaction.save();
    }

    async findAll(): Promise<Transaction[]> {
        return await this.transactionModel.find().exec();
    }
}
