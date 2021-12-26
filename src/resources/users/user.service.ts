import { IUser } from '../../types/interfaces';
import * as usersRepo from './user.memory.repository';

/**
 * Queries all users and returns them
 * @returns Promise object represents the array of all user's oblects
 */
export const getAll = (): Promise<IUser[]> => usersRepo.getAll();

/**
 * Querie user from the database by userId and return it
 * @param id - The user id
 * @returns Promise object represents the user's oblect
 */
export const getById = (id: string): Promise<IUser> => usersRepo.getById(id);

/**
 * Creates a user in the database
 * @param user - The user object
 * @returns Promise object represents the created user's oblect
 */
export const create = (user: IUser): Promise<IUser> => usersRepo.create(user);

/**
 * Update a user in the database
 * @param user - The object contains some user's data to update user in database
 * @param id - The user id
 * @returns Promise object represents the updated user's object.
 */
export const update = (user: Partial<IUser>, id: string): Promise<IUser> =>
  usersRepo.update(user, id);

/**
 * Delete the user from the database
 * @param id - The user id
 * @returns Promise object represents the deleted user's object.
 */
export const deleteById = (id: string): Promise<IUser> =>
  usersRepo.deleteById(id);
