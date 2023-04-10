import { User, UserDto } from '../persistence/entities';
import { QueryResult } from './QueryResult';
import PasswordService from '../services/password.service';

const registerUser = async (
  userName: string,
  email: string,
  password: string,
): Promise<QueryResult<UserDto>> => {
  const hashedPassword: string = await PasswordService.hashPassword(password);
  
  const createdUser: User = await User.create({
    userName,
    email,
    password: hashedPassword,
  }).save();

  return {
    data: {
      id: createdUser.id,
      userName: createdUser.userName,
      email: createdUser.email,
    }
  };
};

export default {
  registerUser,
};