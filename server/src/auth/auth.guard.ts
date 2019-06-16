import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserService} from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService,
                private readonly userService: UserService) {
    }

    async canActivate(context: ExecutionContext) {
        try {
            const request = context.switchToHttp().getRequest();
            const JSONToken = this.getTokenFromAuthHeader(request.headers.authorization);
            const result = await this.authService.validateToken(JSONToken);
            request.user = await this.userService.getUser(result);

            return true;
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    getTokenFromAuthHeader(header: any): string {
        if (header.startsWith('Bearer ')) {
            return header.substring(7, header.length);
        } else {
            throw new HttpException('Invalid authentication token', HttpStatus.BAD_REQUEST);
        }
    }
}
