import {RepositoryMock} from '../../test/mocks/repository.mock';
import {UserTestFactory} from '../../test/test-factory/user-test.factory';
import {Test} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {UserSettingsEntity} from './user-settings.entity';
import {UserEntity} from '../user/user.entity';
import {UserSettingsService} from './user-settings.service';
import {UserSettings} from './user-settings.model';

describe('User Settings Service', () => {

    let user: UserEntity;
    let userSettings: UserSettings;
    let userSettingsService: UserSettingsService;
    let repositoryMock: RepositoryMock<UserSettingsEntity>;

    beforeEach(async () => {
        user = UserTestFactory.createUser();
        userSettings = UserSettingsService.createInitialSettings();
        repositoryMock = new RepositoryMock();

        const testingModule = await Test.createTestingModule({
            providers: [
                UserSettingsService,
                {
                    provide: getRepositoryToken(UserSettingsEntity),
                    useValue: repositoryMock,
                },
            ],
        }).compile();

        userSettingsService = testingModule.get<UserSettingsService>(UserSettingsService);
    });

    describe('when settings are requested', () => {
        it('should call findOne with correct parameters', async () => {
            const expectedQuery = { where: { user } };
            await userSettingsService.getSettings(user);

            expect(repositoryMock.findOne).toHaveBeenCalledWith(expectedQuery);
        });
    });

    describe('when settings are saved', () => {
        it('should call save with correct parameters', async () => {
            const expectedQuery = {...userSettings, user};
            await userSettingsService.saveSettings(user, userSettings);
            expect(repositoryMock.save).toHaveBeenCalledWith(expectedQuery);
        });
    });
});
