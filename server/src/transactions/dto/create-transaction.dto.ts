export class CreateTransactionDto {
    readonly name?: string;
    readonly type?: string;
    readonly value: number;
    readonly owner: string;
    readonly date: number;
}
