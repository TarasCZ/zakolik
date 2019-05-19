import {JwtConfigService} from './jwt-config.service';
import {Module} from '@nestjs/common';

@Module({
    providers: [JwtConfigService],
    exports: [JwtConfigService],
})
export class JwtConfigModule {}
