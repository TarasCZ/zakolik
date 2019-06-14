import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from '../../auth/auth.guard';
import {UserSettingsService} from './user-settings.service';
import {User} from '../user.decorator';
import {UserEntity} from '../user.entity';
import {UserSettings} from './user-settings.model';
import {UpdateUserSettingsDto} from './update-user-settings.dto';

@Controller('user')
export class UserSettingsController {
    constructor(private readonly userSettingsService: UserSettingsService) {
    }

    @Get('/settings')
    @UseGuards(AuthGuard)
    async findAll(@User() user: UserEntity): Promise<UserSettings> {
        return this.userSettingsService.getSettings(user);
    }

    @Post('/settings')
    @UseGuards(AuthGuard)
    async upsert(@Body() updateUserSettingsDto: UpdateUserSettingsDto, @User() user: UserEntity) {
        return this.userSettingsService.saveSettings(user, updateUserSettingsDto);
    }
}
