import {TypeOrmModule} from '@nestjs/typeorm';
import {UserSettingsEntity} from './user-settings.entity';
import {UserSettingsController} from './user-settings.controller';
import {UserSettingsService} from './user-settings.service';
import {Module} from '@nestjs/common';
import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([UserSettingsEntity]), AuthModule],
    controllers: [UserSettingsController],
    providers: [UserSettingsService],
    exports: [UserSettingsService],
})

export class UserSettingsModule {
}
