import { responseCode } from './statusCodes';

/**
 * The class for custom error with http statuscode for response.
 */
export class MyCustomError extends Error {
  readonly myErrStatus: number;

  /**
   * Error constructor create an error with http status code for response
   * @param message - an error message
   * @param status - http status code for response
   * @returns returns new custom error with http status code for response
   */
  constructor(message = 'Error', status = responseCode.NOT_FOUND) {
    super(message);
    this.myErrStatus = status;
  }
}
