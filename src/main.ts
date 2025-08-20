import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfigService } from '@shared/config/env';
import { AppLogger } from '@shared/core/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new AppLogger('NestApplication');
  app.useLogger(logger);

  const validationPipe = new ValidationPipe();
  app.useGlobalPipes(validationPipe);

  app.enableCors({
    methods: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
  });

  const envConfigService = app.get(EnvConfigService);
  const port = envConfigService.get('port');

  await app.listen(port);
  logger.log(`Application running on port ${port}`);
}
void bootstrap();
