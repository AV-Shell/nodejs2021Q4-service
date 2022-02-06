import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const PATH_WHITELIST = ['/doc', '/login'];
const SALT_ROUNDS = 10;

export default {
  PORT: process.env['PORT'],
  NODE_ENV: process.env['NODE_ENV'],
  MONGO_CONNECTION_STRING: process.env['MONGO_CONNECTION_STRING'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  HASH_SECRET: process.env['HASH_SECRET'],
  AUTH_MODE: process.env['AUTH_MODE'] === 'true',
  POSTGRES_HOST: process.env['POSTGRES_HOST'],
  POSTGRES_PORT: process.env['POSTGRES_PORT'],
  POSTGRES_USER: process.env['POSTGRES_USER'],
  POSTGRES_DB: process.env['POSTGRES_DB'],
  POSTGRES_PASSWORD: process.env['POSTGRES_PASSWORD'],
  USE_FASTIFY: process.env['USE_FASTIFY'],
  PATH_WHITELIST,
  SALT_ROUNDS,
};
