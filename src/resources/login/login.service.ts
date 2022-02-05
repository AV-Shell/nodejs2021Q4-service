import jwt from 'jsonwebtoken';
import * as usersRepo from '../users/user.db.repository';
import { config } from '../../common/config';
import { checkHashedParam } from '../../common/hashHelper';

const { JWT_SECRET_KEY } = config;

interface ILoginData {
  login: string;
  password: string;
}

export const getToken = async ({
  login,
  password,
}: ILoginData): Promise<string | null> => {
  const user = await usersRepo.getByLogin(login);

  if (!user || !JWT_SECRET_KEY) {
    return null;
  }
  const isPassTrue = await checkHashedParam(password, user.password);
  if (!isPassTrue) {
    return null;
  }
  const token = jwt.sign({ userId: user.id, login }, JWT_SECRET_KEY);
  return token;
};
