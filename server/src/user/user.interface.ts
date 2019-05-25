import {Document} from 'mongoose';

export interface User {
    id: string;
    email: string;
    nickname: string;
    name: string;
}

export interface UserDocument extends Document, User {
    id: string;
}
