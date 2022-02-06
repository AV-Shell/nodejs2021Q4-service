import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { finished } from 'stream';
import { logger } from './logger';
import config from './config';

@Injectable()
export class LoggerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const { method, body, query, protocol, hostname, originalUrl } = req;

    if (config.USE_FASTIFY !== 'true') {
      finished(res, () => {
        const { statusCode } = res;
        logger.log({
          level: 'info',
          message: `
          Request method: ${method}, Response status: ${statusCode};
          Request url:  ${protocol}://${hostname}${originalUrl};
          Request body: ${JSON.stringify(body)};
          Query params: ${JSON.stringify(query)};`,
        });
      });
    } else {
      res.then(() => {
        logger.log({
          level: 'info',
          message: `
        Request method: ${method}, Response status: ${res.statusCode};
        Request url:  ${protocol}://${hostname}${originalUrl};
        Request body: ${JSON.stringify(body)};
        Query params: ${JSON.stringify(query)};`,
        });
      });
    }
    return true;
  }
}
