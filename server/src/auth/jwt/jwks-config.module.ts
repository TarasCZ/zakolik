import {JwksConfigService} from './jwks-config.service';
import {Module} from '@nestjs/common';
import {ConfigModule} from '../../config/config.module';

@Module({
    imports: [ConfigModule],
    providers: [JwksConfigService],
    exports: [JwksConfigService],
})
export class JwksConfigModule {
}
