import { Module } from '@nestjs/common';
import {
  ExpressFilesController,
  FastifyFilesController,
} from './files.controller';
import { FilesService } from './files.service';
import config from '../common/config';

@Module({
  controllers: [
    config.USE_FASTIFY !== 'true'
      ? ExpressFilesController
      : FastifyFilesController,
  ],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
