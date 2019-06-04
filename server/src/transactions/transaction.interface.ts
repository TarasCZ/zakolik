import {Document} from 'mongoose';

export interface Transaction {
    id: string;
    value: number;
    name?: string;
    type: string;
    owner: string;
    date: number;
    creationDate: number;
}

export interface TransactionDocument extends Transaction, Document {
    id: string;
}
