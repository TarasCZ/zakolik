import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Transaction} from './transaction.interface';
import {InjectRepository} from '@nestjs/typeorm';
import {TransactionEntity} from './transaction.entity';
import {Repository} from 'typeorm';
import {User} from '../user/user.interface';

export const UnauthorizedTransactionUpdateException = new HttpException(
    'You are not authorize to update this transaction',
    HttpStatus.UNAUTHORIZED,
);

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(TransactionEntity) private readonly transactionRepository: Repository<TransactionEntity>) {
    }

    async create(transaction: Transaction, user: User): Promise<Transaction> {
        const currentTransaction = await this.transactionRepository.findOne(transaction.id, { relations: ['user'] });

        if (currentTransaction && currentTransaction.user.id !== user.id) {
            throw UnauthorizedTransactionUpdateException;
        }

        return this.transactionRepository.save({ ...transaction, user });
    }

    async findAll(user: User): Promise<Transaction[]> {
        return this.transactionRepository.find({ user });
    }

    async delete(id: string, user: User): Promise<any> {
        return this.transactionRepository.delete({ id, user });
    }
}
