import {User, UserToken} from '../../src/user/user.interface';

export class UserTestFactory {
    static createUser(partialUser?: Partial<User>): User {
        return {
            id: '123',
            name: 'name',
            nickname: 'nickname',
            email: 'email',
            ...partialUser,
        };
    }

    static createUserToken(partialUserToken?: Partial<UserToken>): UserToken {
        return {
            sub: '123',
            name: 'name',
            nickname: 'nickname',
            email: 'email',
            ...partialUserToken,
        };
    }

    static createPairUserAndToken(partialUser?: Partial<User>, partialUserToken?: Partial<UserToken>): [User, UserToken] {
        return [
            this.createUser(partialUser),
            this.createUserToken(partialUserToken),
        ];
    }
}
