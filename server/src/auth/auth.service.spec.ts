import {AuthService} from './auth.service';
import {JwtService} from '@nestjs/jwt';

describe('Auth Service', () => {
    describe('validateToken method', () => {
        const token = 'token';
        const requestOptions = {algorithms: ['RS256']};
        const result = { result: 'result' };

        let authService: AuthService;
        let jwtService: JwtService;

        beforeEach(() => {
            jwtService = new JwtService({});
            authService = new AuthService(jwtService);

            jest.spyOn(jwtService, 'verifyAsync').mockImplementation(async () => result);
        });

        it('should call jwtService.verifyAsync method with proper parameters', async () => {
            await authService.validateToken(token);

            expect(jwtService.verifyAsync).toHaveBeenCalledTimes(1);
            expect(jwtService.verifyAsync).toHaveBeenCalledWith(token, requestOptions);
        });
    });
});
