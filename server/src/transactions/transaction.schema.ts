import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
    name: String,
    email: String,
});
