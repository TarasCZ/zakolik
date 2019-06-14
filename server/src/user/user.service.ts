import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {User, UserToken} from './user.model';
import {UserSettingsService} from './user-settings/user-settings.service';
import {UserSettingsEntity} from './user-settings/user-settings.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
                @InjectRepository(UserSettingsEntity) private readonly userSettingsRepository: Repository<UserSettingsEntity>) {
    }

    async getUser(token: UserToken): Promise<User> {
        const { sub: id, email, nickname, name, picture } = token;

        const user = await this.userRepository.findOne(id);

        if (user) return user;

        const newUser: User = { id, email, nickname, name, picture };

        await this.createNewUser(newUser);
    }

    private async createNewUser(user: User): Promise<UserEntity> {
        const userSettingsEntity: UserSettingsEntity = {
            ...UserSettingsService.createInitialSettings(),
            picture: user.picture,
            user,
        };

        const newUser = await this.userRepository.save(user);
        await this.userSettingsRepository.save(userSettingsEntity);
        return newUser;
    }
}
