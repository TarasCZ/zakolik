import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
    id: String,
    value: Number,
    name: String,
    type: String,
    owner: String,
    transactionDate: Number,
    creationDate: Number,
});
