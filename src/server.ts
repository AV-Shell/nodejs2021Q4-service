import 'reflect-metadata';
import { createConnection } from 'typeorm';
import configTypeOrm from './common/ormconfig';
import { config } from './common/config';
import app from './app';
import { logger, uncaughtExceptionLogger } from './common/logHandler';

logger.log('error', 'error level log test');
logger.log('warn', 'warn level log test');
logger.log('info', 'info level log test');
logger.log('verbose', 'verbose level log test');
logger.log('debug', 'debug level log test');
logger.log('silly', 'silly level log test');

createConnection(configTypeOrm)
  .then(async (connection) => {
    if (connection.isConnected) {
      logger.log('silly', 'Yuhooo ! DB connected');

      app.listen(config.PORT, () => {
        logger.log('warn', `App is running on http://localhost:${config.PORT}`);
      });
    } else {
      connection.connect();
    }
  })
  .catch((error) => {
    console.log(error);
    uncaughtExceptionLogger('Connection error', error, 'server.ts');
  });
