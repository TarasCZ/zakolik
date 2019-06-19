import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {
    }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        return this.authService.isAuthorized(request);
    }
}
