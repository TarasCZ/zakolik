import {ExecutionContext, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UserToken} from '../user/user.model';
import {UserService} from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
                private readonly userService: UserService) {
    }

    async isAuthorized(request: any) {
        try {
            const JSONToken = this.getTokenFromAuthHeader(request.headers.authorization);

            const validToken = await this.validateToken(JSONToken);

            let user = await this.userService.getUser(validToken);
            if (!user) user = await this.userService.createNewUser(validToken);
            request.user = user;

            return true;
        } catch (err) {
            if (err instanceof HttpException) throw err;
            else throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    private getTokenFromAuthHeader(header: any): string {
        if (header.startsWith('Bearer ')) {
            return header.substring(7, header.length);
        } else {
            throw new HttpException('Invalid authentication token', HttpStatus.BAD_REQUEST);
        }
    }

    private async validateToken(token: string): Promise<UserToken> {
        return this.jwtService.verifyAsync(token, {algorithms: ['RS256']});
    }
}
