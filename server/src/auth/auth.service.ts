import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UserToken} from '../user/user.model';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {
    }

    async validateToken(token: string): Promise<UserToken> {
        return this.jwtService.verifyAsync(token, {algorithms: ['RS256']});
    }
}
