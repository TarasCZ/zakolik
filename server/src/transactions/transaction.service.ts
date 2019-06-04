import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {Transaction, TransactionDocument} from './transaction.interface';
import {UpsertTransactionDto} from './dto/upsert-transaction.dto';
import {InjectModel} from '@nestjs/mongoose';
import {User} from '../user/user.interface';
import * as uuidv4 from 'uuidv4';

@Injectable()
export class TransactionService {
    constructor(@InjectModel('Transaction') private readonly transactionModel: Model<TransactionDocument>) {
    }

    async create(transaction: UpsertTransactionDto): Promise<Transaction> {
        const { id } = transaction; // Can someone knowing id of someone elses transaction edit?
        return this.transactionModel.findOneAndUpdate({ id }, transaction, { upsert: true }).exec();
    }

    async findAll(user: User): Promise<Transaction[]> {
        return this.transactionModel.find({ owner: user.id },
            {
                _id: 0,
                __v: 0,
                owner: 0,
                creationDate: 0,
            }).exec();
    }

    async delete(id: string): Promise<any> {
        return this.transactionModel.deleteOne({ id }).exec();
    }

    assignMetadataToTransaction(transaction: UpsertTransactionDto, user: User): Transaction {
        // ToDo: Make Transformation Pipe
        const timestamp = Date.now();

        return {
            id: uuidv4(),
            creationDate: timestamp,
            date: timestamp,
            owner: user.id,
            type: 'OTHER',
            ...transaction,
        };
    }
}
