import {IsNotEmpty, IsNumber, IsString, IsUUID} from 'class-validator';

export class UpsertTransactionDto {

    @IsUUID('4')
    readonly id: string;

    @IsString()
    readonly name?: string;

    @IsString() // ToDo: Make ENUM
    readonly type?: string;

    @IsNumber()
    @IsNotEmpty()
    readonly value: number;

    @IsNumber()
    readonly date: number;

    @IsString()
    readonly description?: string;
}
