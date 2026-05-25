import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
      'http://localhost:3004',
      'https://gogateproducts.store',
      'https://admin.gogateproducts.store',
      'https://seller.gogateproducts.store',
      'https://hub.gogateproducts.store',
      'https://track.gogateproducts.store',
    ],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`Gogate API listening on http://localhost:${port}/api/v1`);
}
bootstrap();
