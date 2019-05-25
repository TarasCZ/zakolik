import {Controller, Get, Post, Body, Request, UseGuards} from '@nestjs/common';
import {TransactionService} from './transaction.service';
import {CreateTransactionDto} from './dto/create-transaction.dto';
import {Transaction} from './transaction.interface';
import {AuthGuard} from '../auth/auth.guard';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Get()
    @UseGuards(AuthGuard)
    async findAll(@Request() req): Promise<Transaction[]> {
        const user = await req.user;

        return this.transactionService.findAll(user);
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() createTransactionDto: CreateTransactionDto, @Request() req) {
        const user = await req.user;

        const createTransaction = this.transactionService.assignMetadataToTransaction(createTransactionDto, user);

        return this.transactionService.create(createTransaction);
    }
}
