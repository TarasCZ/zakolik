import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {Transaction, TransactionDocument} from './transaction.interface';
import {CreateTransactionDto} from './dto/create-transaction.dto';
import {InjectModel} from '@nestjs/mongoose';
import {User} from '../user/user.interface';
import * as uuidv4 from 'uuidv4';

@Injectable()
export class TransactionService {
    constructor(@InjectModel('Transaction') private readonly transactionModel: Model<TransactionDocument>) {
    }

    async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        const createTransaction = await this.transactionModel.create(createTransactionDto);
        return createTransaction.save();
    }

    async findAll(user: User): Promise<Transaction[]> {
        return await this.transactionModel.find({owner: user.id}).exec();
    }

    assignMetadataToTransaction(transaction: CreateTransactionDto, user: User): Transaction {
        // ToDo: Make Transformation Pipe
        const timestamp = Date.now();

        return {
            id: uuidv4(),
            creationDate: timestamp,
            transactionDate: timestamp,
            owner: user.id,
            type: 'OTHER',
            ...transaction,
        };
    }
}
