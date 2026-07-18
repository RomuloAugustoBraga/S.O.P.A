import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);

  app.enableCors({ origin: true, credentials: true });

  const port = config.get<number>('PORT') ?? 3000;
  await app.listen(port);
  Logger.log(`API rodando em http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
