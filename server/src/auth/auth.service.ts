import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {JwtPayload} from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {
    }

    async validateToken(token: string) {
        return this.jwtService.verifyAsync(token, {algorithms: ['RS256']});
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return {};
    }
}
