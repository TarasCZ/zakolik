import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateTransactionDto {
    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsString() // ToDo: Make ENUM
    readonly type?: string;

    @IsNumber()
    @IsNotEmpty()
    readonly value: number;

    @IsOptional()
    @IsNumber()
    readonly transactionDate?: number;

    @IsOptional()
    @IsString()
    readonly description?: string;
}
