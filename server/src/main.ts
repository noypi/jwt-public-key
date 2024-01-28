import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'src/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    
    console.log('running on port', config.app_port);
    await app.listen(config.app_port);
}
bootstrap();
