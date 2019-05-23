import {Document} from 'mongoose';

export interface Transaction extends Document {
    name: string;
    type: string;
    value: number;
    owner: string;
    date: string;
}
