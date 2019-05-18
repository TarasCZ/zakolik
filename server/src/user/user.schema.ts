import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: String,
    type: String,
    value: Number,
    owner: String,
    date: String,
});
