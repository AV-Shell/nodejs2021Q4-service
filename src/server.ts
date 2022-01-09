import { config } from './common/config';
import app from './app';
import { logger } from './common/logHandler';

logger.log('error', 'error level log test');
logger.log('warn', 'warn level log test');
logger.log('info', 'info level log test');
logger.log('verbose', 'verbose level log test');
logger.log('debug', 'debug level log test');
logger.log('silly', 'silly level log test');

// throw Error('Oops!');

// Promise.reject(Error('Oops!'));

app.listen(config.PORT, () =>
  logger.log('warn', `App is running on http://localhost:${config.PORT}`)
);
