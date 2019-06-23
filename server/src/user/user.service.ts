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

    async getUser(token: UserToken): Promise<UserEntity> {
        return this.userRepository.findOne(token.sub);
    }

    async createNewUser(userToken: UserToken): Promise<UserEntity> {
        const { sub: id, email, name, nickname, picture } = userToken;
        const user: User = { id, email, name, nickname };

        const newUser = await this.userRepository.save(user);

        const userSettingsEntity: UserSettingsEntity = {
            ...UserSettingsService.createInitialSettings(),
            picture,
            user: newUser,
        };
        await this.userSettingsRepository.save(userSettingsEntity);

        return newUser;
    }
}
