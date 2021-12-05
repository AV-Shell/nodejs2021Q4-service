const { responseCode } = require('./statusCodes');

class MyCustomError extends Error {
  constructor(message = 'Error', status = responseCode.NOT_FOUND) {
    super(message);
    this.myErrStatus = status;
  }
}

module.exports = { MyCustomError };
