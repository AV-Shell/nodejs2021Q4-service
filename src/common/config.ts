import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

interface IConfig {
  PORT: number;
  DEBUG: boolean;
  NODE_ENV: string;
  MONGO_CONNECTION_STRING: string;
  HASH_SECRET: string;
  JWT_SECRET_KEY: string;
  AUTH_MODE: boolean;
  FILE_LOG_LEVEL: number;
  CONSOLE_LOG_LEVEL: number;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_DB: string;
  POSTGRES_PASSWORD: string;
  PATH_WHITELIST: Array<string>;
  SALT_ROUNDS: number;
}

// interface ILogLevels {
//   [key: number]: 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';
// }

// export const logLevels: ILogLevels = {
//   0: 'error',
//   1: 'warn',
//   2: 'info',
//   3: 'verbose',
//   4: 'debug',
//   5: 'silly',
// };

export enum ELogLevel {
  off = -1,
  error = 0,
  warn,
  info,
  verbose,
  debug,
  silly,
}

const fileLogLevel = +(process?.env?.FILE_LOG_LEVEL ?? 0);
const consoleLogLevel = +(process.env?.CONSOLE_LOG_LEVEL ?? 0);
const PATH_WHITELIST = ['/doc', '/login'];
const SALT_ROUNDS = 10;

export const config: IConfig = {
  PORT: +(process.env.PORT ?? 4000),
  DEBUG: !!process.env.debug,
  NODE_ENV: process.env.NODE_ENV ?? '',
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING ?? '',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ?? '',
  HASH_SECRET: process.env.HASH_SECRET ?? '',
  AUTH_MODE: process.env.AUTH_MODE === 'true' ?? '',
  FILE_LOG_LEVEL:
    fileLogLevel >= ELogLevel.off && fileLogLevel <= ELogLevel.silly
      ? fileLogLevel
      : ELogLevel.off,
  CONSOLE_LOG_LEVEL:
    consoleLogLevel >= ELogLevel.off && consoleLogLevel <= ELogLevel.silly
      ? consoleLogLevel
      : ELogLevel.off,
  POSTGRES_HOST: process.env.POSTGRES_HOST ?? 'localhost',
  POSTGRES_PORT: +(process.env.POSTGRES_PORT ?? 5432),
  POSTGRES_USER: process.env.POSTGRES_USER ?? 'postgres_user',
  POSTGRES_DB: process.env.POSTGRES_DB ?? 'postgres_db',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ?? 'postgres_password',
  PATH_WHITELIST,
  SALT_ROUNDS,
};
