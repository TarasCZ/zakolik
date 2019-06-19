import {User, UserToken} from './user.model';
import {RepositoryMock} from '../../test/mocks/repository.mock';
import {UserTestFactory} from '../../test/test-factory/user-test.factory';
import {Test} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {UserEntity} from './user.entity';
import {UserService} from './user.service';
import {UserSettingsEntity} from '../user-settings/user-settings.entity';
import {UserSettingsService} from '../user-settings/user-settings.service';

describe('User Service', () => {

    let userId: string;
    let userToken: UserToken;
    let userToken2: UserToken;
    let user: User;
    let user2: User;
    let repositoryUserMock: RepositoryMock<UserEntity>;
    let repositoryUserSettingsMock: RepositoryMock<UserSettingsEntity>;

    let userService: UserService;

    beforeEach(async () => {
        userId = '000';
        [user, userToken] = UserTestFactory.createUserAndTokenPair({ id: userId }, { sub: userId });
        [user2, userToken2] = UserTestFactory.createUserAndTokenPair();
        repositoryUserMock = new RepositoryMock();
        repositoryUserSettingsMock = new RepositoryMock();

        const testingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: repositoryUserMock,
                },
                {
                    provide: getRepositoryToken(UserSettingsEntity),
                    useValue: repositoryUserSettingsMock,
                },
            ],
        }).compile();

        userService = testingModule.get<UserService>(UserService);
    });

    describe('when user is fetched', () => {
        it('should return user from database when present', async () => {
            repositoryUserMock.findOneResult = user;
            const returnedUser = await userService.getUser(userToken);

            expect(returnedUser).toEqual(user);
        });
    });

    describe('when user is fetched', () => {
        it('should create new one when not present', async () => {
            repositoryUserMock.findOneResult = user2;
            await userService.createNewUser(userToken2);

            expect(repositoryUserSettingsMock.save).toHaveBeenCalledWith({
                ...UserSettingsService.createInitialSettings(),
                picture: userToken2.picture,
                user: user2,
            });
            expect(repositoryUserMock.save).toHaveBeenCalledWith(user2);
        });
    });
});
