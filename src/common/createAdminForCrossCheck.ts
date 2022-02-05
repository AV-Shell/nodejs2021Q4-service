import { create } from '../resources/users/user.service';
import { User } from '../entity/User';

export const createAdmin = async (): Promise<void> => {
  await create(
    new User({
      name: 'Maksim',
      login: 'admin',
      password: 'admin',
    })
  );
};
