import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import * as fastify from 'fastify';
import * as util from 'util';
import stream = require('stream');

@Injectable()
export class FilesService {
  async createFile(file): Promise<object> {
    try {
      const fileName = `${Date.now()}-${uuid.v4()}-${file.originalname}`;

      const filePath = path.resolve(process.cwd(), 'staticFiles');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      const writefilePromise = new Promise((resolve, reject) => {
        fs.writeFile(path.join(filePath, fileName), file.buffer, (err) => {
          if (err) {
            reject();
          } else {
            resolve('ok');
          }
        });
      });
      await writefilePromise;

      return { fileName: fileName };
    } catch (error) {
      throw new HttpException(
        'File Write Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getFile(filepath) {
    try {
      return fs.createReadStream(
        path.join(process.cwd(), 'staticFiles', filepath),
      );
    } catch (error) {
      throw new HttpException(
        'File Read Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async uploadFile(
    req: fastify.FastifyRequest,
    res: fastify.FastifyReply<any>,
  ): Promise<any> {
    //Check request is multipart
    if (!req.isMultipart()) {
      throw new BadRequestException('Request is not multipart');
    }
    const result = { filename: '' };
    const thishandler = this.handler.bind(this, result);
    const mp = await req.multipart(thishandler, onEnd);
    // for key value pairs in request
    mp.on('field', function (key: any, value: any) {
      console.log('form-data', key, value);
    });
    // Uploading finished
    async function onEnd(err: any) {
      if (err) {
        res.send(new HttpException('Internal server error', 500));
        return;
      }
      res.code(200).send({
        fileName: result.filename,
        message:
          'In the process of writing this function, I turned gray, and lost a lot of nerve cells ',
      });
    }
  }
  //Save files in directory
  async handler(
    result: { filename: string },
    field: string,
    file: any,
    filename: string,
    encoding: string,
    mimetype: string,
  ): Promise<void> {
    const pipeline = util.promisify(stream.pipeline);
    const fileName = `${Date.now()}-${uuid.v4()}-${filename}`;
    result.filename = fileName;
    const filePath = path.resolve(process.cwd(), 'staticFiles');
    if (!fs.existsSync(filePath)) {
      console.log(4);
      fs.mkdirSync(filePath, { recursive: true });
    }
    const writeStream = fs.createWriteStream(`${filePath}/${fileName}`); //File path
    try {
      await pipeline(file, writeStream);
    } catch (err) {
      console.error('Pipeline failed', err);
    }
  }
}
