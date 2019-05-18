import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import * as jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';

const DOMAIN = 'dev-l2w-mks0.eu.auth0.com';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    resolve(): MiddlewareFunction {
        return (req, res, next) => {
            jwt({
                secret: expressJwtSecret({
                    cache: true,
                    rateLimit: true,
                    jwksRequestsPerMinute: 5,
                    jwksUri: `https://${DOMAIN}/.well-known/jwks.json`,
                }),

                audience: 'http://localhost:3000',
                issuer: `https://${DOMAIN}/`,
                algorithms: ['RS256'],
            })(req, res, (err) => {
                if (err) {
                    const status = err.status || 500;
                    const message = err.message || 'Sorry, we were unable to process your request.';
                    return res.status(status).send({
                        message,
                    });
                }
                next();
            });
        };
    }
}
