import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // This pipe enables the class-validator decorators in your DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Notification Scheduler API')
    .setDescription('API for scheduling WhatsApp and Email notifications')
    .setVersion('1.0')
    .addTag('scheduler')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Your API docs will be at /api

  await app.listen(8080);
}
bootstrap();