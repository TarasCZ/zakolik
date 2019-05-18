import {userProviders} from './user.provider';
import {DatabaseModule} from '../database/database.module';
import {UserController} from './user.controller';
import {Module} from '@nestjs/common';
import {UserService} from './user.service';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserService, ...userProviders],
})

export class UserModule {}
