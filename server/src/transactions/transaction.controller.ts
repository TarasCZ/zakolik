import {Controller, Get, Post, Body, Request, UseGuards, Delete, Param} from '@nestjs/common';
import {TransactionService} from './transaction.service';
import {UpsertTransactionDto} from './dto/upsert-transaction.dto';
import {Transaction} from './transaction.interface';
import {AuthGuard} from '../auth/auth.guard';
import {TransactionEntity} from './transaction.entity';
import {User} from '../user/user.decorator';
import {UserEntity} from '../user/user.entity';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {
    }

    @Get()
    @UseGuards(AuthGuard)
    async findAll(@User() user: UserEntity): Promise<Transaction[]> {
        return this.transactionService.findAll(user);
    }

    @Post()
    @UseGuards(AuthGuard)
    async upsert(@Body() upsertTransactionDto: UpsertTransactionDto, @User() user: UserEntity) {
        const upsertTransaction = { ...upsertTransactionDto, user };

        return this.transactionService.create(upsertTransaction as TransactionEntity);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async delete(@Param('id') id: string, @User() user: UserEntity) {
        return this.transactionService.delete(id, user);
    }
}
