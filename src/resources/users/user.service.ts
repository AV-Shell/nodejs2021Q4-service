import { IUser } from '../../types/interfaces';
import * as usersRepo from './user.memory.repository';

export const getAll = (): Promise<IUser[]> => usersRepo.getAll();

export const getById = (id: string): Promise<IUser> => usersRepo.getById(id);

export const create = (user: IUser): Promise<IUser> => usersRepo.create(user);

export const update = (user: Partial<IUser>, id: string): Promise<IUser> =>
  usersRepo.update(user, id);

export const deleteById = (id: string): Promise<IUser> =>
  usersRepo.deleteById(id);
