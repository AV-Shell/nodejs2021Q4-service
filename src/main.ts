import { NestApplication, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerGuard } from './common/logger.guard';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import config from './common/config';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  let app;

  if (config.USE_FASTIFY !== 'true') {
    app = await NestFactory.create<NestApplication>(AppModule);
    console.log('express');
  } else {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
    console.log('fastify');
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Swagger-debugger')
    .setDescription('Some description')
    .setVersion('0.0.0.0.0.0.0.1')
    .addTag('AV-Shell')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, swaggerDocument);

  app.useGlobalGuards(new LoggerGuard());

  await app.listen(PORT, () => {
    console.log(`Server start at ${PORT} port`);
  });
}
bootstrap();
