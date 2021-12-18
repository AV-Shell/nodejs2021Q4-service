import { NextFunction, Request, Response } from 'express';
import { MyCustomError } from './myCustomError';
import { responseCode } from './statusCodes';
// import { IReq, IRes } from '../OrientExpress/OrientExpress.d';

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = responseCode;

function exceptionHandler(err: Error): void {
  console.error(err.message);
  process.exit(9);
}

export const uncaughtExceptionHandler = (err: Error): void => {
  console.log('uncaughtExceptionHandler');
  exceptionHandler(err);
};

export const unhandledRejectionHandler = (err: Error): void => {
  console.log('unhandledRejectionHandler');
  exceptionHandler(err);
};

export const errorHandler = (
  err: Error | MyCustomError,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('error handler \r\n');
  if (err instanceof MyCustomError) {
    console.log('error handler \r\n', err?.myErrStatus);
    res.status(err.myErrStatus ?? NOT_FOUND).send(err.message);
  } else {
    res.status(INTERNAL_SERVER_ERROR).json('Something wrong');
  }
  next(err);
};

// export const errorHandler = (
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void => {
//   console.log('errorHandler');
//   if (err instanceof MyCustomError) {
//     console.log('errorHandler');
//     console.log(err, req, err.myErrStatus);
//     res.status(err.myErrStatus ?? NOT_FOUND).send(err.message);
//     return;
//   }
//   console.log('errorHandler');
//   console.log(err, req, 500);
//   res.status(INTERNAL_SERVER_ERROR).send('Something wrong');
//   next(err);
// };
