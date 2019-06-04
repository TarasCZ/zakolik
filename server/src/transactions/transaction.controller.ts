import {Controller, Get, Post, Body, Request, UseGuards, Delete, Param} from '@nestjs/common';
import {TransactionService} from './transaction.service';
import {UpsertTransactionDto} from './dto/upsert-transaction.dto';
import {Transaction} from './transaction.interface';
import {AuthGuard} from '../auth/auth.guard';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {
    }

    @Get()
    @UseGuards(AuthGuard)
    async findAll(@Request() req): Promise<Transaction[]> {
        const user = await req.user;

        return this.transactionService.findAll(user);
    }

    @Post()
    @UseGuards(AuthGuard)
    async upsert(@Body() createTransactionDto: UpsertTransactionDto, @Request() req) {
        const user = await req.user;

        const createTransaction = this.transactionService.assignMetadataToTransaction(createTransactionDto, user);

        return this.transactionService.create(createTransaction);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async delete(@Param('id') id: string) {
        return this.transactionService.delete(id);
    }
}
