import { User } from '../../entity/User';
import * as usersRepo from './user.db.repository';
import { hashParam } from '../../common/hashHelper';

/**
 * Queries all users and returns them
 * @returns Promise object represents the array of all user's oblects
 */
export const getAll = (): Promise<User[]> => usersRepo.getAll();

/**
 * Querie user from the database by userId and return it
 * @param id - The user id
 * @returns Promise object represents the user's oblect
 */
export const getById = (id: string): Promise<User> => usersRepo.getById(id);

/**
 * Creates a user in the database
 * @param user - The user object
 * @returns Promise object represents the created user's oblect
 */
// export const create = (user: User): Promise<User> => usersRepo.create(user);
export const create = async (user: User): Promise<User> => {
  const { password } = user;
  user.password = await hashParam(password);
  return usersRepo.create(user);
};

/**
 * Update a user in the database
 * @param user - The object contains some user's data to update user in database
 * @param id - The user id
 * @returns Promise object represents the updated user's object.
 */
// export const update = (user: Partial<User>, id: string): Promise<User> =>
//   usersRepo.update(user, id);
export const update = async (
  user: Partial<User>,
  id: string
): Promise<User> => {
  const { password } = user;
  if (password) {
    user.password = await hashParam(password);
  }
  return usersRepo.update(user, id);
};

/**
 * Delete the user from the database
 * @param id - The user id
 * @returns Promise object represents the deleted user's object.
 */
export const deleteById = (id: string): Promise<User> =>
  usersRepo.deleteById(id);
