import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';

import { AuthService } from './auth.service';
import {AuthGuard} from './auth.guard';
import {JwtConfigService} from './jwt/jwt-config.service';
import {JwtConfigModule} from './jwt/jwt-config.module';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [JwtConfigModule],
            useFactory: async (jwtConfigService: JwtConfigService) => ({
                publicKey: await jwtConfigService.getPublicKey(),
            }),
            inject: [JwtConfigService],
        }),
    ],
    controllers: [],
    providers: [AuthService, AuthGuard],
    exports: [AuthGuard, AuthService],
})
export class AuthModule {}
