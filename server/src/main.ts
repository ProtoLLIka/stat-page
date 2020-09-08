import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataBaseService } from './dataBase/dataBaseService';
import { readFileSync, readFile, writeFile } from 'fs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  await app.listen(4000);
}
bootstrap();
