const { MyCustomError } = require('./myCustomError');
const {
  responseCode: { NOT_FOUND, INTERNAL_SERVER_ERROR },
} = require('./statusCodes');

function exceptionHandler(err) {
  console.error(err.message);
  process.exit(9);
}

const uncaughtExceptionHandler = (err) => {
  exceptionHandler(err);
};

const unhandledRejectionHandler = (err) => {
  exceptionHandler(err);
};

const errorHandler = (err, req, res) => {
  if (err instanceof MyCustomError) {
    res.status(err.myErrStatus ?? NOT_FOUND).send(err.message);
    return;
  }
  res.json('Something wrong', INTERNAL_SERVER_ERROR);
};

module.exports = {
  errorHandler,
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
};
