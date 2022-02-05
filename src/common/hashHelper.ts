import bcrypt from 'bcrypt';
import { config } from './config';

const { SALT_ROUNDS } = config;
export const hashParam = async (param: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(param, salt);
  return hash;
};

export const checkHashedParam = async (
  param: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(param, hash);
};
