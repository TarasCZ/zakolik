import {Inject, Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {User} from './user.interface';
import {CreateUserDto} from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }
}
