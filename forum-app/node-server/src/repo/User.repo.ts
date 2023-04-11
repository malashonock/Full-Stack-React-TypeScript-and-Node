import { User } from '../persistence/entities';
import { UserDto } from '../shared/dto/User.dto';
import PasswordService from '../services/password.service';

const registerUser = async (
  userName: string,
  email: string,
  password: string,
): Promise<UserDto> => {
  const hashedPassword: string = await PasswordService.hashPassword(password);
  
  const createdUser: User = await User.create({
    userName,
    email,
    password: hashedPassword,
  }).save();

  return {
    id: createdUser.id,
    userName: createdUser.userName,
    email: createdUser.email,
  };
};

export default {
  registerUser,
};