import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { logger } from './logger';
import config from './config';

@Catch()
export class MyExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status;
    let message;
    let reason;

    try {
      status = exception.getStatus();
      message = exception?.message?.error || exception?.message || ' :(';
      reason = 'may be I ... may be You ...';
    } catch {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'something went wrong';
      reason = 'shit happens';
    }
    const { method, body, query, protocol, hostname, originalUrl } = request;
    logger.log({
      level: 'error',
      message: `
          Error Message: ${
            exception?.message?.error || exception?.message || ''
          }
          Error Stack: \r\n${JSON.stringify(exception, null, 4)}\r\n;
          Request method: ${method}, Response status: ${status};
          Request url:  ${protocol}://${hostname}${originalUrl};
          Request body: ${JSON.stringify(body)};
          Query params: ${JSON.stringify(query)};`,
    });

    const errorToSend = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      reason,
      method: request.method,
    };

    if (config.USE_FASTIFY !== 'true') {
      response.status(status).json(errorToSend);
    } else {
      response.status(status).send(errorToSend);
    }
  }
}
