// import { finished } from 'stream';
// import morgan = from 'morgan';
import { createLogger, format, transports } from 'winston';
// import express, { Request, Response, NextFunction } from 'express';

export const logger = createLogger({
  transports: [
    new transports.File({
      filename: './logs/info.log',
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(
          (info) => `${info['timestamp']} ${info.level}: ${info.message}`,
        ),
      ),
    }),
    new transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(
          (info) => `${info['timestamp']} ${info.level}: ${info.message}`,
        ),
      ),
    }),
  ],
});

// export const myLoggerReq = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void => {
//   const { method, body, query, protocol, hostname, originalUrl } = req;

//   finished(res, () => {
//     const { statusCode } = res;
//     logger.log({
//       level: 'info',
//       message: `
//       Request method: ${method}, Response status: ${statusCode};
//       Request url:  ${protocol}://${hostname}${originalUrl};
//       Request body: ${JSON.stringify(body)};
//       Query params: ${JSON.stringify(query)};`,
//     });
//   });

//   next();
// };

// export const errorHandlerRequestLogger = (
//   err: Error,
//   req: express.Request,
//   status: number
// ): void => {
//   const { method, body, query, protocol, hostname, originalUrl } = req;

//   logger.log({
//     level: 'error',
//     message: `
//       Error Message: ${err.message}
//       Request method: ${method}, Response status: ${status};
//       Request url:  ${protocol}://${hostname}${originalUrl};
//       Request body: ${JSON.stringify(body)};
//       Query params: ${JSON.stringify(query)};`,
//   });
// };

export const uncaughtExceptionLogger = (
  mess: string,
  err: Error,
  origin: string,
): void => {
  logger.on('finish', () => {
    process.exit(1);
  });
  logger.log({
    level: 'error',
    message: `
    ${mess} error:
    Caught exception: ${err}
    Error stack: ${err.stack}
    Exception origin: ${origin}`,
  });
};

export const unhandledRejectionLogger = (mess: string): void => {
  logger.log({
    level: 'error',
    message: `
    ${mess}`,
  });
};
