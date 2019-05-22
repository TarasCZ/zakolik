import {JwtConfigService} from './jwt-config.service';
import {Module} from '@nestjs/common';
import {ConfigModule} from '../../config/config.module';

@Module({
    imports: [ConfigModule],
    providers: [JwtConfigService],
    exports: [JwtConfigService],
})
export class JwtConfigModule {}
