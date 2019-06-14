import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserSettingsEntity} from './user-settings.entity';
import {UserSettings} from './user-settings.model';
import {User} from '../user.model';

@Injectable()
export class UserSettingsService {

    static createInitialSettings(): UserSettings {
        return {
            language: 'cz',
            theme: 'LIGHT-THEME',
            stickyHeader: true,
            pageAnimations: true,
            elementsAnimations: true,
            picture: '',
        };
    }
    constructor(@InjectRepository(UserSettingsEntity) private readonly userSettingsRepository: Repository<UserSettingsEntity>) {
    }

    async getSettings(user: User): Promise<UserSettings> {
        return this.userSettingsRepository.findOne({ where: { user } });
    }

    async saveSettings(user: User, settings: UserSettings): Promise<UserSettings> {
        const userSettingsEntity: UserSettingsEntity = { ...settings, picture: user.picture, user };
        return this.userSettingsRepository.save(userSettingsEntity);
    }
}
