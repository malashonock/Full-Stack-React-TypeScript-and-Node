import { User } from '../persistence/entities';
import { UserFields } from '../shared/types';
import PasswordService from '../services/password.service';
import dataSource from '../persistence/dataSource';

const UserRepository = dataSource.getRepository(User).extend({

  async createUser({
    userName,
    email,
    password,
  }: UserFields): Promise<User> {
    const hashedPassword: string = await PasswordService.hashPassword(password);
    
    const createdUser: User = this.create({
      userName,
      email,
      password: hashedPassword,
    });

    await this.save(createdUser);
  
    return createdUser;
  },

  async updateUser(id: string, {
    userName,
    email,
    password,
  }: UserFields): Promise<User | null> {
    const updatedUser = await this.getUserById(id);

    if (!updatedUser) {
      return null;
    }

    if (userName) updatedUser.userName = userName;
    if (email) updatedUser.email = email;
    if (password) updatedUser.password = await PasswordService.hashPassword(password);

    await this.save(updatedUser);

    return updatedUser;
  },

  async getAllUsers(): Promise<User[]> {
    const categories = await this.find();
    return categories;
  },

  async getUserById(
    id: string,
  ): Promise<User | null> {
    if (!id) {
      throw new Error('User id is not defined');
    }

    const user = await this.findOneBy({ id });
  
    return user;
  },

  async getUserByName(
    userName: string,
  ): Promise<User | null> {
    const user = await this.findOneBy({ userName });
  
    return user;
  },

});

export default UserRepository;