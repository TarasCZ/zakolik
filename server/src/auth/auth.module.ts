import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';

import { AuthService } from './auth.service';
import {AuthGuard} from './auth.guard';
import {JwksConfigService} from './jwt/jwks-config.service';
import {JwksConfigModule} from './jwt/jwks-config.module';
import {UserModule} from '../user/user.module';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [JwksConfigModule],
            useFactory: async (jwtConfigService: JwksConfigService) => ({
                publicKey: await jwtConfigService.getPublicKey(),
            }),
            inject: [JwksConfigService],
        }),
        UserModule,
    ],
    providers: [AuthService, AuthGuard],
    exports: [AuthService, AuthGuard],
})
export class AuthModule {}
