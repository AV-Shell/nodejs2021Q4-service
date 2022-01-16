import { getRepository } from 'typeorm';
import { User } from '../../entity/User';
import { MyCustomError } from '../../common/myCustomError';
import { unassignTaskByUserId } from '../tasks/task.db.repository';

export const getAll = async (): Promise<User[]> => {
  const userTypeormRepo = getRepository(User);
  return userTypeormRepo.find();
};

export const getById = async (id: string): Promise<User> => {
  const userTypeormRepo = getRepository(User);
  const user = await userTypeormRepo.findOne(id);
  if (!user) {
    throw new MyCustomError(`The user with id ${id} was not found`, 404);
  }
  return user;
};

export const create = async (user: User): Promise<User> => {
  const userTypeormRepo = getRepository(User);
  const resUser = await userTypeormRepo.create(user);
  await userTypeormRepo.save(resUser);
  return resUser;
};

export const update = async (
  userData: Partial<User>,
  id: string
): Promise<User> => {
  const userTypeormRepo = getRepository(User);
  const user = await userTypeormRepo.findOne(id);
  if (!user) {
    throw new MyCustomError(`The user with id ${id} was not found`, 404);
  }
  const result = await userTypeormRepo.save({ ...user, ...userData, id });
  return result;
};

export const deleteById = async (id: string): Promise<User> => {
  const userTypeormRepo = getRepository(User);
  const user = await userTypeormRepo.findOne(id);
  if (!user) {
    throw new MyCustomError(`The user with id ${id} was not found`, 404);
  }
  await unassignTaskByUserId(id);
  await userTypeormRepo.delete(id);
  return user;
};
