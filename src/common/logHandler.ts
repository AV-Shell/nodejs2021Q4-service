import { finished } from 'stream';
// import morgan = from 'morgan';
import { createLogger, format, transports } from 'winston';
import express, { Request, Response, NextFunction } from 'express';
import { config, ELogLevel } from './config';

const transportsArray: Array<
  transports.FileTransportInstance | transports.ConsoleTransportInstance
> = [];

if (config.FILE_LOG_LEVEL > ELogLevel.off) {
  transportsArray.push(
    new transports.File({
      filename: './logs/info.log',
      level: ELogLevel[config.FILE_LOG_LEVEL],
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    })
  );
}

if (config.CONSOLE_LOG_LEVEL > ELogLevel.off) {
  transportsArray.push(
    new transports.Console({
      level: ELogLevel[config.CONSOLE_LOG_LEVEL],
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    })
  );
}

export const logger = createLogger({
  level: 'info',
  transports: [
    ...transportsArray,
    new transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
  ],
});

/**
 * Middleware for logging in express routes
 * @param req - express request
 * @param res - express response
 * @param next - express next function to call next middlware
 * @returns returns nothing
 */
export const myLoggerReq = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { method, body, query, protocol, hostname, originalUrl } = req;

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

  next();
};

/**
 * Error logger
 * @param err - error for logging
 * @param req - express request
 * @param status - response status
 * @returns returns nothing
 */
export const errorHandlerRequestLogger = (
  err: Error,
  req: express.Request,
  status: number
): void => {
  const { method, body, query, protocol, hostname, originalUrl } = req;

  logger.log({
    level: 'error',
    message: `
      Error Message: ${err.message}
      Request method: ${method}, Response status: ${status};
      Request url:  ${protocol}://${hostname}${originalUrl};
      Request body: ${JSON.stringify(body)};
      Query params: ${JSON.stringify(query)};`,
  });
};
/**
 * uncaught exception logger
 * @param mess - message for logging
 * @param err - error for logging
 * @param origin - origin data
 * @returns returns nothing
 */
export const uncaughtExceptionLogger = (
  mess: string,
  err: Error,
  origin: string
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

/**
 * nhandled Rejection logger
 * @param mess - message for logging
 * @returns returns nothing
 */
export const unhandledRejectionLogger = (mess: string): void => {
  logger.on('finish', () => {
    process.exit(1);
  });
  logger.log({
    level: 'error',
    message: `
    ${mess}`,
  });
};
