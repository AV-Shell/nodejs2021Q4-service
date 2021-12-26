import { NextFunction, Request, Response } from 'express';
import { MyCustomError } from './myCustomError';
import { responseCode } from './statusCodes';
import {
  errorHandlerRequestLogger,
  uncaughtExceptionLogger,
  unhandledRejectionLogger,
} from './logHandler';

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = responseCode;

/**
 * Callback for uncaught exceptions (errors)
 * @param err - error to be logged
 * @param origin - exception origin to be logged
 * @returns returns nothing
 */
export const uncaughtExceptionHandler = (err: Error, origin: string): void => {
  uncaughtExceptionLogger('UncaughtException', err, origin);
};

/**
 * Callback for unhandled rejections (promise reject)
 * @param err - error to be logged
 * @param promise - rejected promise to be logged
 * @returns returns nothing
 */
export const unhandledRejectionHandler = (
  reason: Error,
  promise: Promise<void>
): void => {
  unhandledRejectionLogger(
    `Unhandled Rejection at: ${promise} ${JSON.stringify(promise, null, 2)} 
    Error stack: ${reason.stack}
    Error message: ${reason.message}`
  );
};

/**
 * Middleware for handling errors in express routes
 * @param err - error to be logged
 * @param req - express request
 * @param res - express response
 * @param next - express next function to call next middlware
 * @returns returns nothing
 */
export const errorHandler = (
  err: Error | MyCustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof MyCustomError) {
    errorHandlerRequestLogger(err, req, err.myErrStatus);
    res.status(err.myErrStatus ?? NOT_FOUND).send(err.message);
    return;
  }
  errorHandlerRequestLogger(err, req, INTERNAL_SERVER_ERROR);
  res.status(INTERNAL_SERVER_ERROR).json('Something wrong');
  next();
};
