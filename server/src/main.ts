import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger, ValidationPipe} from '@nestjs/common';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
    const fs = require('fs');

    let key;
    let cert;
    let ca;

    try {
        key = fs.readFileSync('/etc/letsencrypt/live/zakolik.eu/privkey.pem');
        cert = fs.readFileSync('/etc/letsencrypt/live/zakolik.eu/fullchain.pem');
    } catch (err) {
        console.warn('Certificates not found, running server without https');
    }

    const nestOptions = { cors: true };
    // if (key && cert) Object.defineProperty(nestOptions, 'httpsOptions', { value: { key, cert } });

    const app = await NestFactory.create(AppModule, nestOptions);
    app.useGlobalPipes(new ValidationPipe());
    app.use(helmet());
    app.use(
        rateLimit({
            windowMs: 5 * 60 * 1000, // 5 minutes
            max: 150,
        }),
    );
    const port = app.get('ConfigService').get('PORT');
    await app.listen(port);

    Logger.log(`Server is listening on port ${port}`, 'NestApplication');
}

bootstrap();
