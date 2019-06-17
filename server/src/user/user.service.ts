import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {User, UserToken} from './user.model';
import {UserSettingsService} from '../user-settings/user-settings.service';
import {UserSettingsEntity} from '../user-settings/user-settings.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
                @InjectRepository(UserSettingsEntity) private readonly userSettingsRepository: Repository<UserSettingsEntity>) {
    }

    async getUser(token: UserToken): Promise<User> {
        const user = await this.userRepository.findOne(token.sub);

        if (user) return user;

        return this.createNewUser(token);
    }

    private async createNewUser(userToken: UserToken): Promise<UserEntity> {
        const { sub: id, email, name, nickname, picture } = userToken;
        const user: User = {id, email, name, nickname};

        const newUser = await this.userRepository.save(user);

        const userSettingsEntity: UserSettingsEntity = {
            ...UserSettingsService.createInitialSettings(),
            picture,
            user: newUser,
        };
        console.log(userSettingsEntity);

        const what = await this.userSettingsRepository.save(userSettingsEntity);
        console.log(what);
        return newUser;
    }
}

