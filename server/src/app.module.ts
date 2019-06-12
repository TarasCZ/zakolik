import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {TransactionModule} from './transactions/transaction.module';
import {ConfigModule} from './config/config.module';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UserModule,
        TransactionModule,
        AuthModule,
        ConfigModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
