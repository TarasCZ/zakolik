import * as jwksClientFactory from 'jwks-rsa';

export class JwtConfigService {

    private kid = 'RTMxREEwRTE1MUJERUVDMDY0MkNBMEFBMzFCRjcyN0Y2QjhBQUZDNA';
    private jwksClient = jwksClientFactory({
        cache: true,
        jwksUri: 'https://dev-l2w-mks0.eu.auth0.com/.well-known/jwks.json',
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
