import { NestApplication, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerGuard } from './common/logger.guard';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationException } from 'src/exceptions/validation.exception';

import config from './common/config';
// import { contentParser } from 'fastify-multer';
// import * as multer from 'fastify-multer';
import fmp = require('fastify-multipart');

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  let app;

  if (config.USE_FASTIFY !== 'true') {
    app = await NestFactory.create<NestApplication>(AppModule);
    console.log('express');
  } else {
    // const fAdapt = new FastifyAdapter();
    // fAdapt.register(contentParser);
    // app = await NestFactory.create<NestFastifyApplication>(
    //   AppModule,
    //   // new FastifyAdapter(),
    //   fAdapt,
    // );
    // // app.register(contentParser);

    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
    app.register(fmp);
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

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const messages = errors.map((err) => {
          return `${err.property} - ${Object.values(err.constraints).join(
            ', ',
          )}`;
        });
        return new ValidationException(messages);
      },
    }),
  );

  await app.listen(PORT, () => {
    console.log(`Server start at ${PORT} port`);
  });
}
bootstrap();
