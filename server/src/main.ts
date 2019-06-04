import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger, ValidationPipe} from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalPipes(new ValidationPipe());
    const port = app.get('ConfigService').get('PORT');
    await app.listen(port);

    Logger.log(`Server is listening on port ${port}`, 'NestApplication');
}

bootstrap();
