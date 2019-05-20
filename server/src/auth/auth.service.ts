import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {
    }

    async validateToken(token: string) {
        return this.jwtService.verifyAsync(token, {algorithms: ['RS256']});
    }

    async validateUser(payload: any): Promise<any> {
        return {};
    }
}
