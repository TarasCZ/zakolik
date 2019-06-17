import {Global, Module} from '@nestjs/common';
import {UserService} from './user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from './user.entity';
import {UserSettingsEntity} from '../user-settings/user-settings.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, UserSettingsEntity])],
    providers: [UserService],
    exports: [UserService],
})

export class UserModule {
}
