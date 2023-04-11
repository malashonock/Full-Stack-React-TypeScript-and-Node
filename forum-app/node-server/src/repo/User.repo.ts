import { User } from '../persistence/entities';
import { UserDto } from '../shared/dto/User.dto';
import PasswordService from '../services/password.service';

const createUser = async (
  userName: string,
  email: string,
  password: string,
): Promise<User> => {
  const hashedPassword: string = await PasswordService.hashPassword(password);
  
  const createdUser: User = await User.create({
    userName,
    email,
    password: hashedPassword,
  }).save();

  return createdUser;
};

const findUserByName = async (
  userName: string,
): Promise<User | null> => {
  const user = await User.findOne({
    where: { userName },
  });

  return user;
};

export default {
  createUser,
  findUserByName,
};