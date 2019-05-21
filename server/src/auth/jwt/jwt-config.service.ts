import * as jwksClientFactory from 'jwks-rsa';
import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {ConfigService} from '../../config/config.service';

@Injectable()
export class JwtConfigService {

    constructor(private readonly config: ConfigService) {}

    private kid = this.config.get('AUTH0_KID');
    private jwksClient = jwksClientFactory({
        cache: true,
        jwksUri: this.config.get('AUTH0_JWKS_URL'),
    });

    async getPublicKey(): Promise<any> {
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
