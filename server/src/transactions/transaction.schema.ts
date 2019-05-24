import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
    name: String,
    type: String,
    value: Number,
    owner: String,
    date: Number,
});
