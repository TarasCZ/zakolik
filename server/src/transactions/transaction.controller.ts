import {Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import {TransactionService} from './transaction.service';
import {CreateTransactionDto} from './dto/create-transaction.dto';
import {Transaction} from './transaction.interface';
import {AuthGuard} from '../auth/auth.guard';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Get()
    @UseGuards(AuthGuard)
    async findAll(): Promise<Transaction[]> {
        return this.transactionService.findAll();
    }

    @Post('create')
    async create(@Body() createTransactionDto: CreateTransactionDto) {
        return this.transactionService.create(createTransactionDto);
    }
}
