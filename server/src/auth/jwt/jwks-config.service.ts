import * as jwksClientFactory from 'jwks-rsa';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '../../config/config.service';

@Injectable()
export class JwksConfigService {

    constructor(private readonly config: ConfigService) {
    }

    private kid = this.config.get('AUTH0_KID');
    private jwksClient = jwksClientFactory({
        cache: true,
        jwksUri: this.config.get('AUTH0_JWKS_URL'),
    });

    async getPublicKey(): Promise<string | Buffer> {
        return new Promise((resolve, reject) => {
            const callback = (err, jwks) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(jwks.publicKey);
                }
            };
            this.jwksClient.getSigningKey(this.kid, callback);
        });
    }
}
