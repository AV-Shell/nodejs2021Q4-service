import * as DB from '../../common/inMemoryDB';
import { IUser } from '../../types/interfaces';
import { MyCustomError } from '../../common/myCustomError';
import { responseCode } from '../../common/statusCodes';

const { NOT_FOUND } = responseCode;

export const getAll = async (): Promise<IUser[]> => DB.getAllUsers();

export const getById = async (id: string): Promise<IUser> => {
  const user = await DB.getUserById(id);
  if (!user) {
    throw new MyCustomError(`The user with id ${id} was not found`, NOT_FOUND);
  }
  return user;
};

export const create = async (user: IUser): Promise<IUser> =>
  DB.createUser(user);

export const update = async (
  userData: Partial<IUser>,
  id: string
): Promise<IUser> => {
  const user = await DB.updateUser(userData, id);
  if (!user) {
    throw new MyCustomError(`The user with id ${id} was not found`, NOT_FOUND);
  }
  return user;
};

export const deleteById = async (id: string): Promise<IUser> => {
  const user = await DB.deleteUserById(id);
  if (!user) {
    throw new MyCustomError(`The user with id ${id} was not found`, NOT_FOUND);
  }
  return user;
};
