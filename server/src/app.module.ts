import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {TransactionModule} from './transactions/transaction.module';
import {ConfigModule} from './config/config.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserSettingsModule} from './user-settings/user-settings.module';
import {ConfigService} from './config/config.service';

@Module({
    imports: [
        provideDatabaseOrmModule(),
        UserModule,
        UserSettingsModule,
        TransactionModule,
        AuthModule,
        ConfigModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

function provideDatabaseOrmModule() {
    const configService = new ConfigService(`${process.env.NODE_ENV}.env`);

    return TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'database',
        port: 5432,
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
    });
}
