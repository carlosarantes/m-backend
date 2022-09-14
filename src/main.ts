import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Miniclip avatar content management')
    .setDescription('API developed to manage Miniclip user avatars')
    .setVersion('1.0')
    .setContact(
      'Carlos Arantes',
      'https://miniclip.com',
      'carlos.arantes@miniclip.com',
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  app.useStaticAssets(join(__dirname, '..', 'upload'), {
    prefix: '/upload/',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3010);
}
bootstrap();
