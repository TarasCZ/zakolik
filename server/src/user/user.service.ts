import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {User, UserDocument} from './user.interface';
import {InjectModel} from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {
    }

    async getUser(token: any) {
        const user = await this.findUser(token.sub);

        if (user) return user;

        const { sub: id, email, nickname, name } = token;

        return this.create({ id, email, nickname, name });
    }

    private async findUser(id: string): Promise<User> {
        return this.userModel.findOne({ id }).exec();
    }

    private async create(newUser: User): Promise<User> {
        return new this.userModel(newUser).save();
    }
}
