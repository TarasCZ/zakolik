import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Transaction} from './transaction.interface';
import {InjectRepository} from '@nestjs/typeorm';
import {TransactionEntity} from './transaction.entity';
import {FindOneOptions, Repository} from 'typeorm';
import {UserEntity} from '../user/user.entity';

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(TransactionEntity) private readonly transactionRepository: Repository<TransactionEntity>) {
    }

    async create(transaction: TransactionEntity): Promise<Transaction> {
        const currentTransaction = await this.transactionRepository.findOne(transaction.id, { relations: ['user'] });

        if (currentTransaction && currentTransaction.user.id !== transaction.user.id) {
            throw new HttpException('You are not authorize to update this transaction', HttpStatus.UNAUTHORIZED);
        }

        return this.transactionRepository.save(transaction);
    }

    async findAll(user: UserEntity): Promise<Transaction[]> {
        return this.transactionRepository.find({ user });
    }

    async delete(id: string, user: UserEntity): Promise<any> {
        return this.transactionRepository.delete({ id, user });
    }
}
