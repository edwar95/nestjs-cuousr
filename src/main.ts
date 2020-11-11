import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const serverConfig: { port: number } = config.get('server');
  const logger: Logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port:number = serverConfig.port;
  await app.listen(port);
  logger.log(`Application running on port: ${port}`);
}

bootstrap();
