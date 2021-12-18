import { responseCode } from './statusCodes';

export class MyCustomError extends Error {
  readonly myErrStatus: number;

  constructor(message = 'Error', status = responseCode.NOT_FOUND) {
    super(message);
    this.myErrStatus = status;
  }
}
