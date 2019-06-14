import {Controller, Get, Post, Body, UseGuards, Delete, Param} from '@nestjs/common';
import {TransactionService} from './transaction.service';
import {UpsertTransactionDto} from './dto/upsert-transaction.dto';
import {Transaction} from './transaction.model';
import {AuthGuard} from '../auth/auth.guard';
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
        return this.transactionService.create(upsertTransactionDto, user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async delete(@Param('id') id: string, @User() user: UserEntity) {
        return this.transactionService.delete(id, user);
    }
}
