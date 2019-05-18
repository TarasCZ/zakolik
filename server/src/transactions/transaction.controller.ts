import { Controller, Get, Post, Body } from '@nestjs/common';
import {TransactionService} from './transaction.service';
import {CreateTransactionDto} from './dto/create-transaction.dto';
import {Transaction} from './transaction.interface';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Get()
    async findAll(): Promise<Transaction[]> {
        return this.transactionService.findAll();
    }

    @Post('create')
    async create(@Body() createTransactionDto: CreateTransactionDto) {
        this.transactionService.create(createTransactionDto);
    }
}
