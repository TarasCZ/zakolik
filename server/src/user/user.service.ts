import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {User, UserToken} from './user.interface';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
    }

    async getUser(token: UserToken): Promise<User> {
        const { sub: id, email, nickname, name } = token;

        const user = await this.userRepository.findOne(id);

        if (user) return user;

        return this.userRepository.save({ id, email, nickname, name });
    }
}
