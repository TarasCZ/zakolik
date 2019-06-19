import {AuthService} from './auth.service';
import {JwtService} from '@nestjs/jwt';
import {Test} from '@nestjs/testing';
import {TransactionEntity} from '../transactions/transaction.entity';
import {UserService} from '../user/user.service';
import {RepositoryMock} from '../../test/mocks/repository.mock';
import {HttpException, HttpStatus} from '@nestjs/common';

const Promisify = (value) => new Promise((res) => res(value));

describe('Auth Service', () => {
    describe('validateToken method', () => {
        let verifyAsync;
        let getUser;
        let createNewUser;

        let user;
        let token;
        let bearerToken;
        let requestOptions;
        let requestWithInvalidToken;
        let request;
        let result;

        let authService: AuthService;
        let jwtService: JwtService;
        let userService: UserService;
        let repositoryMock: RepositoryMock<TransactionEntity>;

        beforeEach(async () => {
            initializeVariables();
            const testingModule = await Test.createTestingModule({
                providers: [
                    AuthService,
                    UserService,
                    JwtService,
                ],
            })
                .overrideProvider(JwtService).useValue({ verifyAsync })
                .overrideProvider(UserService).useValue({ getUser, createNewUser })
                .compile();

            jwtService = testingModule.get<JwtService>(JwtService);
            authService = testingModule.get<AuthService>(AuthService);
            userService = testingModule.get<UserService>(UserService);
        });

        function initializeVariables() {
            verifyAsync = jest.fn();
            getUser = jest.fn();
            createNewUser = jest.fn();

            user = { name: 'user' };
            token = 'token';
            bearerToken = `Bearer ${token}`;
            requestOptions = { algorithms: ['RS256'] };
            requestWithInvalidToken = {
                headers: { authorization: token },
                user: null,
            };
            request = {
                headers: { authorization: bearerToken },
                user: null,
            };
            result = { result: 'result' };

            repositoryMock = new RepositoryMock();
        }

        it('should call jwtService.verifyAsync method with extracted token and option object', async () => {
            expect(await authService.isAuthorized(request)).toBeTruthy();

            expect(jwtService.verifyAsync).toHaveBeenCalledTimes(1);
            expect(jwtService.verifyAsync).toHaveBeenCalledWith(token, requestOptions);
        });

        it('should throw an exception when token is invalid', async () => {
            await expect(authService.isAuthorized(requestWithInvalidToken))
                .rejects.toEqual(new HttpException('Invalid authentication token', HttpStatus.BAD_REQUEST));
        });

        it('should assign user fetched from userService when exist', async () => {
            getUser.mockReturnValue(Promisify(user));
            expect(await authService.isAuthorized(request)).toBeTruthy();

            expect(request.user).toEqual(user);
        });

        it('should assign user fetched from userService when exist', async () => {
            createNewUser.mockReturnValue(user);
            expect(await authService.isAuthorized(request)).toBeTruthy();

            expect(request.user).toEqual(user);
        });
    });
});
