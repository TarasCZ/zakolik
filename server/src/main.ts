import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger} from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = app.get('ConfigService').get('PORT');
    await app.listen(port);

    Logger.log(`Server is listening on port ${port}`, 'NestApplication');
}

bootstrap();
