import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req, res, next: () => void) {
    // console.log('request middleware', req.method);
    next();
  }
}
