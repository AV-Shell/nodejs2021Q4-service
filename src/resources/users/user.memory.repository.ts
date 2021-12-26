import * as DB from '../../common/inMemoryDB';
import { IUser } from '../../types/interfaces';
import { MyCustomError } from '../../common/myCustomError';
import { responseCode } from '../../common/statusCodes';

const { NOT_FOUND } = responseCode;

/**
 * Queries all users from the database and returns them
 * @returns  Promise object represents the array of all users's oblects
 */
export const getAll = async (): Promise<IUser[]> => DB.getAllUsers();

/**
 * Querie user from the database by id and return it
 * @param id - The user id
 * @returns Promise object represents the users's oblect
 *
 * @throws {@link MyCustomError}
 * Will throw an error if the user not found..
 */
export const getById = async (id: string): Promise<IUser> => {
  const user = await DB.getUserById(id);
  if (!user) {
    throw new MyCustomError(`The user with id ${id} was not found`, NOT_FOUND);
  }
  return user;
};

/**
 * Creates an user in the database
 * @param user - The user object
 * @returns Promise object represents the created user's oblect
 */
export const create = async (user: IUser): Promise<IUser> =>
  DB.createUser(user);

/**
 * Update a user in the database
 * @param userData - The object contains some user's data to update user in database
 * @param id - The user id
 * @returns Promise object represents the updated user's object.
 *
 * @throws {@link MyCustomError}
 * Will throw an error if the user not found..
 */
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

/**
 * Delete the user from the database
 * @param id - The user id
 * @returns Promise object represents the deleted user's object.
 *
 * @throws {@link MyCustomError}
 * Will throw an error if the user not found..
 */
export const deleteById = async (id: string): Promise<IUser> => {
  const user = await DB.deleteUserById(id);
  if (!user) {
    throw new MyCustomError(`The user with id ${id} was not found`, NOT_FOUND);
  }
  return user;
};
