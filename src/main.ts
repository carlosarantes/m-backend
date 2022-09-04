import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3010);
}
bootstrap();
