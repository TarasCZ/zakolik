import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {Transaction} from './transaction.interface';
import {CreateTransactionDto} from './dto/create-transaction.dto';
import {InjectModel} from '@nestjs/mongoose';
import {User} from '../user/user.interface';

@Injectable()
export class TransactionService {
    constructor(@InjectModel('Transaction') private readonly transactionModel: Model<Transaction>) {
    }

    async create(createUserDto: CreateTransactionDto): Promise<Transaction> {
        const createTransaction = new this.transactionModel(createUserDto);
        return await createTransaction.save();
    }

    async findAll(user: User): Promise<Transaction[]> {
        return await this.transactionModel.find({owner: user.id}).exec();
    }
}
