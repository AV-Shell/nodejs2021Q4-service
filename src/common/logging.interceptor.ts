import {
  CallHandler,
  ExecutionContext,
  Injectable,
  // Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    // const request = context.switchToHttp().getRequest();
    // const responce = context.switchToHttp().getResponse();
    // const { method, url } = request;
    // const { statusCode } = responce;
    // const startDate = Date.now();
    // console.log('tap responce statusCode', statusCode)
    return next.handle().pipe(
      tap(() => {
        //  console.log('tap responce statusCode', statusCode);
        //  Logger.log(`${method} ${url}  ${Date.now() - startDate}ms`,
        //  context.getClass().name, )
      }),
    );
  }
}
