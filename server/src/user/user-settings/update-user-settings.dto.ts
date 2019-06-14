import {IsBoolean, IsString} from 'class-validator';
import {UserSettings} from './user-settings.model';

export class UpdateUserSettingsDto implements UserSettings {
    @IsString()
    readonly language: string;

    @IsString()
    readonly theme: string;

    @IsBoolean()
    readonly stickyHeader: boolean;

    @IsBoolean()
    readonly pageAnimations: boolean;

    @IsBoolean()
    readonly elementsAnimations: boolean;

    @IsString()
    readonly picture: string;
}
