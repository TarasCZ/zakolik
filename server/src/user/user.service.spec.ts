import {User, UserToken} from './user.model';
import {RepositoryMock} from '../../test/mocks/repository.mock';
import {UserTestFactory} from '../../test/test-factory/user-test.factory';
import {Test} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {UserEntity} from './user.entity';
import {UserService} from './user.service';

describe('User Service', () => {

    let userId: string;
    let userToken: UserToken;
    let userToken2: UserToken;
    let user: User;
    let user2: User;
    let repositoryMock: RepositoryMock<UserEntity>;

    let userService: UserService;

    beforeEach(async () => {
        userId = '000';
        [user, userToken] = UserTestFactory.createPairUserAndToken({ id: userId }, { sub: userId });
        [user2, userToken2] = UserTestFactory.createPairUserAndToken();
        repositoryMock = new RepositoryMock();

        const testingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: repositoryMock,
                },
            ],
        }).compile();

        userService = testingModule.get<UserService>(UserService);
    });

    describe('when user is fetched', () => {
        it('should create new one when not present', async () => {
            await userService.getUser(userToken2);

            expect(repositoryMock.save).toHaveBeenCalledWith(user2);
        });

        it('should return user from database when present', async () => {
            repositoryMock.findOneResult = user;
            const returnedUser = await userService.getUser(userToken);

            expect(returnedUser).toEqual(user);
        });
    });
});
