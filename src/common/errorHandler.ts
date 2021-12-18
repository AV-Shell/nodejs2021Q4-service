import { NextFunction, Request, Response } from 'express';
import { MyCustomError } from './myCustomError';
import { responseCode } from './statusCodes';

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = responseCode;

/**
 * Logs the error and terminates the process
 * @param err - error to be logged
 * @returns returns nothing, terminates the program.
 */
function exceptionHandler(err: Error): void {
  console.error(err.message);
  process.exit(9);
}

/**
 * Callback for uncaught exceptions (errors)
 * @param err - error to be logged
 * @returns returns nothing
 */
export const uncaughtExceptionHandler = (err: Error): void => {
  exceptionHandler(err);
};

/**
 * Callback for unhandled rejections (promise reject)
 * @param err - error to be logged
 * @returns returns nothing
 */
export const unhandledRejectionHandler = (err: Error): void => {
  exceptionHandler(err);
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
  console.log('Midleware error handler ');
  console.log('Request ', req.originalUrl);
  console.log('error message', err.message);
  if (err instanceof MyCustomError) {
    res.status(err.myErrStatus ?? NOT_FOUND).send(err.message);
    console.log('error statuscode ', err.myErrStatus ?? NOT_FOUND);
  } else {
    console.log('error stack \r\n', err.stack);
    res.status(INTERNAL_SERVER_ERROR).json('Something wrong');
  }
  next();
};
