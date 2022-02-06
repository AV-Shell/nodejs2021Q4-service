import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Param,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import * as fastify from 'fastify';

@Controller('file')
export class ExpressFilesController {
  constructor(private filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createFile(@UploadedFile() file: Express.Multer.File) {
    return await this.filesService.createFile(file);
  }

  @Get(':path')
  getFile(@Param('path') path: string, @Res() res) {
    const fileStream = this.filesService.getFile(path);
    fileStream.pipe(res);
  }
}

@Controller('file')
export class FastifyFilesController {
  constructor(private filesService: FilesService) {}

  @Post()
  async uploadFile(
    @Req() req: fastify.FastifyRequest,
    @Res() res: fastify.FastifyReply<any>,
  ): Promise<any> {
    return await this.filesService.uploadFile(req, res);
  }

  @Get(':path')
  getFile(@Param('path') path: string) {
    const fileStream = this.filesService.getFile(path);
    return new StreamableFile(fileStream);
  }
}
