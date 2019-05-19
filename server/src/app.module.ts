import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {TransactionModule} from './transactions/transaction.module';
import {AuthenticationMiddleware} from './common/auth.middleware';

@Module({
    imports: [UserModule, TransactionModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
