import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {TransactionModule} from './transactions/transaction.module';
import {ConfigModule} from './config/config.module';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://mongo/zakolik'),
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
