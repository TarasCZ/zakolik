import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {
    }

    async canActivate(context: ExecutionContext) {
        try {
            const request = context.switchToHttp().getRequest();
            const token = this.getTokenFromAuthHeader(request.headers.authorization);
            const result = await this.authService.validateToken(token);
            Logger.log(result, 'Authentication Attempt');
            return true;
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    getTokenFromAuthHeader(header: any): string {
        if (header.startsWith('Bearer ')){
            return header.substring(7, header.length);
        } else {
            throw new HttpException('Invalid authentication token', HttpStatus.BAD_REQUEST);
        }
    }
}
