import { UserFields } from '@shared/types';

import { User } from '../persistence/entities';
import PasswordService from '../services/password.service';
import dataSource from '../persistence/dataSource';

const UserRepository = dataSource.getRepository(User).extend({
  async createUser({ name, email, password }: UserFields): Promise<User> {
    const hashedPassword: string = await PasswordService.hashPassword(password);

    const createdUser: User = this.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.save(createdUser);

    return createdUser;
  },

  async updateUser(
    id: string,
    { name, email, password }: Partial<UserFields>,
  ): Promise<User | null> {
    const updatedUser = await this.getUserById(id);

    if (!updatedUser) {
      return null;
    }

    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;
    if (password)
      updatedUser.password = await PasswordService.hashPassword(password);

    await this.save(updatedUser);

    return updatedUser;
  },

  async getAllUsers(): Promise<User[]> {
    const categories = await this.find();
    return categories;
  },

  async getUserById(id: string): Promise<User | null> {
    if (!id) {
      throw new Error('User id is not defined');
    }

    const user = await this.findOneBy({ id });

    return user;
  },

  async getUserByName(name: string): Promise<User | null> {
    const user = await this.findOneBy({ name });

    return user;
  },
});

export default UserRepository;
