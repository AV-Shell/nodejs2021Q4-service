import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../../types/interfaces';

/**
 * The class for create User.
 */
export default class User implements IUser {
  id: string;
  name: string;
  login: string;
  password: string;

  /**
   * User constructor
   * @param user - an object that contains all or part of the user's record parameters
   * @returns returns created user object
   */
  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: Partial<IUser> = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Static metod for removing password from user object
   * @param user - a user object
   * @returns returns user object without the password
   */
  static toResponse(user: IUser): Omit<IUser, 'password'> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
