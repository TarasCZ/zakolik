import {Document} from 'mongoose';

export interface User extends Document {
    id: string;
    email: string;
    nickanme: string;
    name: string;
}
